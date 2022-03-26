
'use strict';

const { checkDonationExists, deleteDocument } = require('../utils/db_query.utils')
const HTTPStatus = require('http-status');
const projectionField = {
  _id: 1
}

module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {
      const eventObj = await checkDonationExists(req, req.params.uuid, projectionField)

      if (eventObj && Object.keys(eventObj).length > 0) {

        const deleteEventResponse = await deleteDocument(req, eventObj._id);
        if (deleteEventResponse) {
          return res.status(HTTPStatus.OK).json({
            status: HTTPStatus.OK,
            message: "Data deleted."
          })
        }

        return res.status(HTTPStatus.NOT_MODIFIED).json({
          status: HTTPStatus.NOT_MODIFIED,
          message: "Data delete failed."
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