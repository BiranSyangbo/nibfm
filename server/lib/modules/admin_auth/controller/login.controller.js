const { loginPayloadValidation } = require('../utils/validation.helper')
const HTTPStatus = require('http-status');
const { getUserInfoByUsername } = require('../utils/mongo_query.helper');

module.exports = async (req, res, next) => {
  try {

    const { isValid, msg } = loginPayloadValidation(req.body);

    if (isValid) {

      const getUserInfoByUserName = await getUserInfoByUsername(req, req.body.username);
      if (getUserInfoByUserName && Object.keys(getUserInfoByUserName).length > 0) {
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          msg: "Login success.",
          token: "jwt-token"
        })
      }

      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: HTTPStatus.BAD_REQUEST,
        msg: "Invalid credential provided."
      })
    }

    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      msg: msg
    })
  } catch (error) {
    return next(error)
  }
}