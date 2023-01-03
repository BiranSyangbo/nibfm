'use strict';

const HTTPStatus = require('http-status');
const moduleConfig = require('../config');

const helperFunc = {
  getCurrentProfileYear: async (req) => {
    try {
      return req.db.collection(moduleConfig.profileYearCollection).findOne(
        {
          deleted: false
        },
        {
          projection: {
            _id: 0,
            profileYear: 1
          }
        }
      )
    } catch (error) {
      throw error;
    }
  },
}
module.exports = async (req, res, next) => {
  try {
    const currentProfileYearInfo = await helperFunc.getCurrentProfileYear(req);
    if (currentProfileYearInfo && Object.keys(currentProfileYearInfo).length > 0) {
      return res.status(HTTPStatus.OK).json({
        status: HTTPStatus.OK,
        message: 'Data fetched.',
        data: currentProfileYearInfo
      });
    }
    return res.status(HTTPStatus.NOT_FOUND).json({
      status: HTTPStatus.NOT_FOUND,
      message: 'Data fetched.',
      data: currentProfileYearInfo,
    });
  } catch (error) {
    return next(error);
  }
};
