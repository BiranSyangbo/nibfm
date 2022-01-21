const jwtHelper = require('../helpers/jwt.helper')
const HTTPStatus = require('http-status');

const sendUnAuthorizedError = (res) => {
  try {
    return res.status(HTTPStatus.UNAUTHORIZED).json({
      status: HTTPStatus.UNAUTHORIZED,
      message: "UNAUTHORIZED"
    })

  } catch (error) {
    throw error;
  }
}
module.exports = async (req, res, next) => {
  try {
    const token = req.headers['Authorization'] || req.headers['authorization'];



    const decodedJWT = await jwtHelper.decodeJWTToken(token);

    if (decodedJWT && Object.keys(decodedJWT).length > 0) {

      const checkJwtTokenInfo = await req.db.collection('login-session').findOne({
        token: token,
        deleted: false,
        expiry_time: { $gte: Date.now() },
        user: decodedJWT.user
      })

      if (checkJwtTokenInfo && Object.keys(checkJwtTokenInfo).length > 0) {

        const verifyJwtToken = await jwtHelper.verifyToken(token, process.env.TOKEN_SECRET);
        if (verifyJwtToken && !verifyJwtToken.err) {
          req.decoded = {
            userId: verifyJwtToken.user
          }
          req.authToken = token;
          return next();
        }
      }
    }
    return sendUnAuthorizedError(res);
  } catch (error) {
    return next(error)
  }
}