const JWTHelper = require('../helpers/jwt.helper')
const httpResponseHelper = require(`../helpers/http_response.helper`);
const HTTPStatus = require('http-status');

const sendUnAuthorizedError = (res) => {
  try {
    return httpResponseHelper.sendNormalResponse(res, HTTPStatus.UNAUTHORIZED,
      {
        status: HTTPStatus.UNAUTHORIZED,
        message: "UNAUTHORIZED"
      })
  } catch (error) {
    throw error;
  }
}
module.exports = async (req, res, next) => {
  try {
    const token = req.headers['Authorization'] || req.headers['authorization']

    const decodedJWT = JWTHelper.decodeJWTToken(token);

    if (decodedJWT) {
      const verifyJwtToken = await JWTHelper.verifyJWTToken(token, process.env.TOKEN_SECRET);
      if (verifyJwtToken && !verifyJwtToken.err) {
        req.decoded = {
          userId: checkLoginSession.user.id
        }
        return next();
      }
    }
    return sendUnAuthorizedError(res);
  } catch (error) {
    return next(error)
  }
}