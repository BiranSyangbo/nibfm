const validationUtils = require('../utils/validation.utils');
const HTTPStatus = require('http-status');
const dbQueryUtils = require('../utils/db_query.utils');

module.exports = async (req, res, next) => {
  try {

    const { isValid, msg } = validationUtils(req.body);
    if (isValid) {

      const checkDuplicateSlug = await dbQueryUtils.checkDuplicateSlug(req, req.body.slug);
      if (!checkDuplicateSlug) {
        const insertResponse = await dbQueryUtils.insert(req, req.body);
        if (insertResponse) {
          return res.status(HTTPStatus.OK).json({
            status: HTTPStatus.OK,
            message: "A new event has been successfully created."
          })
        }

        return res.status(HTTPStatus.NOT_MODIFIED).json({
          status: HTTPStatus.NOT_MODIFIED,
          message: "We're sorry, but we were unable to create new event."
        })
      }
      return res.status(HTTPStatus.CONFLICT).json({
        status: HTTPStatus.CONFLICT,
        message: "We're sorry, but provided event slug is alreaday existed."
      })

    }

    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      message: msg
    })

  } catch (error) {
    return next(error);
  }
}