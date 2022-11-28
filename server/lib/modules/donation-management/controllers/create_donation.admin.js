const validationUtils = require('../utils/validation.utils');
const HTTPStatus = require('http-status');
const dbQueryUtils = require('../utils/db_query.utils');

module.exports = async (req, res, next) => {
  try {

    const { isValid, msg } = validationUtils(req.body);
    if (isValid) {


      const insertResponse = await dbQueryUtils.insert(req, req.body);
      if (insertResponse) {
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          message: "A donation has been successfully created."
        })
      }

      return res.status(HTTPStatus.NOT_MODIFIED).json({
        status: HTTPStatus.NOT_MODIFIED,
        message: "We're sorry, but we were unable to create donation records."
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