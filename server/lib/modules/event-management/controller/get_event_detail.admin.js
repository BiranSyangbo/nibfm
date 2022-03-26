
'use strict';

const { checkDonationExists } = require('../utils/db_query.utils')
const HTTPStatus = require('http-status');
const projectionField = {
  _id: 1,
  title: 1,
  slug: 1,
  author: 1,
  description: 1,
  date: 1,
  image: 1,
  meta: 1,
  status: 1,
  createdAt: 1,
}

module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {
      const eventDetailInfo = await checkDonationExists(req, req.params.uuid, projectionField)

      if (eventDetailInfo && Object.keys(eventDetailInfo).length > 0) {
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          message: "Data fetched.",
          data: eventDetailInfo
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