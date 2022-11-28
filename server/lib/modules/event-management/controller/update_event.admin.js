
'use strict';

const validationUtils = require('../utils/validation.utils');

const { checkDonationExists, update, checkDuplicateSlug } = require('../utils/db_query.utils')
const HTTPStatus = require('http-status');
const projectionField = {
  _id: 1,
  slug: 1
}

module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {
      const eventInfo = await checkDonationExists(req, req.params.uuid, projectionField)

      if (eventInfo && Object.keys(eventInfo).length > 0) {

        const { isValid, msg } = validationUtils(req.body);
        if (isValid) {

          if (eventInfo.slug !== req.body.slug) {
            const checkSlugExists = await checkDuplicateSlug(req, req.body.slug);
            if (checkSlugExists && Object.keys(checkSlugExists).length > 0) {
              return res.status(HTTPStatus.CONFLICT).json({
                status: HTTPStatus.CONFLICT,
                message: "We're sorry, but provided slug is alreday existed."
              })
            }
          }

          const updateResponse = await update(req, req.body, eventInfo._id);
          if (updateResponse) {
            return res.status(HTTPStatus.OK).json({
              status: HTTPStatus.OK,
              message: "Event has been successfuly updated."
            })
          }

          return res.status(HTTPStatus.NOT_MODIFIED).json({
            status: HTTPStatus.NOT_MODIFIED,
            message: "We're sorry, but we were unable to save your changes."
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
      message: "We're sorry, but we were unable to find the data you were looking for."
    })
  } catch (error) {
    return next(error);
  }
}