const HTTPStatus = require('http-status');
const { getUserLoginInfo, getUserInfoByUserId } = require('../utils/mongo_query.helper')
const changePasswordHelper = require('../utils/change_password_helper')

const moduleConfig = require('../config')

const internalHelper = {
  hasRecord: (list) => {
      return (list && (list.length > 0));
    },
  validatePw : (newPass ,confirmPass) => {
      return (newPass === confirmPass)
  },
  checkPasswordStrength: password => {
      try {
        return moduleConfig.config.passwordStrengthRegex.test(String(password));
      } catch (error) {
        throw error;
      }
  },
  customerExist : async (req, userId) => {
      try {
          let projection = {
              uuid : 1,
              password : 1
            }
            return await getUserInfoByUserId(req,projection,userId)
      } catch (error) {
          throw error;
      }
  }
}

module.exports = async (req, res, next) => {
  try {
    const checkJwtTokenInfo = await getUserLoginInfo(req, req.decoded.userId)



    if (checkJwtTokenInfo && Object.keys(checkJwtTokenInfo).length > 0) {

      let checkValiduser = await internalHelper.customerExist(req, checkJwtTokenInfo.user);

      if (checkValiduser){

        if (internalHelper.validatePw(req?.body?.newPassword, req?.body?.confirmPassword)){

            if (!internalHelper.checkPasswordStrength(req?.body?.newPassword)) {
              return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                msg: "We're sorry, but provided password is weak."
              });
              }
          const changePasswordObj = {
            oldPassword : req?.body?.oldPassword,
            newPassword : req?.body?.newPassword,
            confirmPassword : req?.body?.confirmPassword
            }

            const changePwResp = await changePasswordHelper(req, changePasswordObj ,req.decoded.userId, checkValiduser.password);

            if (!changePwResp){
                return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                msg: "We're sorry, but provided password is invalid."
              });
            }

            //Logout Method TODO:

            return res.status(HTTPStatus.OK).json({
              status: HTTPStatus.OK,
              message: "Password Changed Sucessfully, Please relogin to the system."
            })

        }
        else{
          return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            msg: "We're sorry, but provided password doesn't match"
          });
        }
    }

    }
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      msg: "We're sorry, but unexpected happend please contact to adminstration"
    })
  } catch (error) {
    return next(error)
  }
}