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
            message: "Event created successfully."
          })
        }

        return res.status(HTTPStatus.NOT_MODIFIED).json({
          status: HTTPStatus.NOT_MODIFIED,
          message: "Event can not be created."
        })
      }
      return res.status(HTTPStatus.CONFLICT).json({
        status: HTTPStatus.CONFLICT,
        message: "Duplicate event slug."
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