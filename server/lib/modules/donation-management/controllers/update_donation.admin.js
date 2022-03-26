
'use strict';

const validationUtils = require('../utils/validation.utils');

const { checkDonationExists, update } = require('../utils/db_query.utils')
const HTTPStatus = require('http-status');
const donationProjection = {
  _id: 1
}

module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {
      const donationDetailInfo = await checkDonationExists(req, req.params.uuid, donationProjection)

      if (donationDetailInfo && Object.keys(donationDetailInfo).length > 0) {

        const { isValid, msg } = validationUtils(req.body);
        if (isValid) {

          const updateDonationResponse = await update(req, req.body, donationDetailInfo._id);
          if (updateDonationResponse) {
            return res.status(HTTPStatus.OK).json({
              status: HTTPStatus.OK,
              message: "Data updated."
            })
          }

          return res.status(HTTPStatus.NOT_MODIFIED).json({
            status: HTTPStatus.NOT_MODIFIED,
            message: "Data update failed."
          })
        }

        return res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus.BAD_REQUEST,
          message: msg
        })



      }
    }

    return res.status(HTTPStatus.NOT_FOUND).json({
      status: HTTPStatus.NOT_FOUND,
      message: "Data not found."
    })
  } catch (error) {
    return next(error);
  }
}