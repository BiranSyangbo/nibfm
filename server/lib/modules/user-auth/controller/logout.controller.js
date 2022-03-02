const HTTPStatus = require('http-status');
const { getUserLoginInfo, deleteUserLoginInfo } = require('../utils/mongo_query.helper');

module.exports = async (req, res, next) => {
  try {
    const checkJwtTokenInfo = await getUserLoginInfo(req, req.decoded.userId)

    if (checkJwtTokenInfo && Object.keys(checkJwtTokenInfo).length > 0) {

      const deleteResponse = await deleteUserLoginInfo(req.db, checkJwtTokenInfo._id);
      if(deleteResponse){
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          msg: "Logout success."
        })
      }
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      msg: "Logout fail."
    })
  } catch (error) {
    return next(error)
  }
}