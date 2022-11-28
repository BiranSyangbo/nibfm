
'use strict';

const { checkDonationExists, deleteDocument } = require('../utils/db_query.utils')
const HTTPStatus = require('http-status');
const donationProjection = {
  _id: 1
}

module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {
      const donationDetailInfo = await checkDonationExists(req, req.params.uuid, donationProjection)

      if (donationDetailInfo && Object.keys(donationDetailInfo).length > 0) {

        const deleteDonationResponse = await deleteDocument(req, donationDetailInfo._id);
        if (deleteDonationResponse) {
          return res.status(HTTPStatus.OK).json({
            status: HTTPStatus.OK,
            message: "we have successfully removed donation record successfully."
          })
        }

        return res.status(HTTPStatus.NOT_MODIFIED).json({
          status: HTTPStatus.NOT_MODIFIED,
          message: "We're sorry, but we were unable to remove donation record."
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