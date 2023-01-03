'use strict';

const HTTPStatus = require('http-status');
const moment = require('moment');
const moduleConfig = require('../config');
const uuid = require('uuid');

const helperFunc = {
  validateFormData: (body) => {
    try {
      if (!body?.profileYear || body?.profileYear.trim().length === 0) return { isValid: false, msg: "Profile year required." };
      if (body.profileYear && !moment(body.profileYear, 'YYY-MM-DD', true).isValid()) return { isValid: false, msg: "Invalid profile year date provided." };

      return { isValid: true, msg: "" }
    } catch (error) {
      throw error;
    }
  },
  getCurrentProfileYear: async (req) => {
    try {
      return req.db.collection(moduleConfig.profileYearCollection).findOne(
        {
          deleted: false
        },
        {
          projection: { _id: 1 }
        }
      )
    } catch (error) {
      throw error;
    }
  },
  updateProfileYearInfo: async (getProfileYearDetailInfo, req) => {
    try {
      return req.db.collection(moduleConfig.profileYearCollection).updateOne({
        _id: getProfileYearDetailInfo._id
      },
        {
          $set: {
            profileYear: new Date(req.body.profileYear),
            updatedAt: new Date(),
            updatedBy: req.decoded.userId
          }
        })
    } catch (error) {
      throw error;
    }
  },
  insertProfileYearInfo: async (req) => {
    try {
      const insertObject = {
        _id: uuid.v4(),
        profileYear: new Date(req.body.profileYear),
        deleted: false,
        createdAt: new Date(),
        createdBy: req.decoded.userId
      }
      return req.db.collection(moduleConfig.profileYearCollection).insertOne(insertObject);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = async (req, res, next) => {
  try {

    const formValidationResponse = helperFunc.validateFormData(req.body);
    if (formValidationResponse.isValid) {

      const getProfileYearDetailInfo = await helperFunc.getCurrentProfileYear(req);
      let upsertProfileInfoResponse = false;
      if (getProfileYearDetailInfo && Object.keys(getProfileYearDetailInfo).length > 0) {
        upsertProfileInfoResponse = await helperFunc.updateProfileYearInfo(getProfileYearDetailInfo, req);
      } else {
        upsertProfileInfoResponse = await helperFunc.insertProfileYearInfo(req);
      }
      if (upsertProfileInfoResponse) {
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          message: 'Data updated successfully.',
        });
      } else {
        return res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus.BAD_REQUEST,
          message: 'Data update failed.',
        });
      }

    }

    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      message: formValidationResponse.msg,
    });

  } catch (error) {
    return next(error);
  }
};
