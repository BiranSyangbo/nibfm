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
          message: "Donation created successfully."
        })
      }

      return res.status(HTTPStatus.NOT_MODIFIED).json({
        status: HTTPStatus.NOT_MODIFIED,
        message: "Donation can not be created."
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