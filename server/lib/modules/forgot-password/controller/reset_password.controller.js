/**
 * @author Janak
 * @method resetPassword
 */
 'use strict';
 const { updateTokenStatus,getForgotPassTokenDetailInfo } = require('../utils/forgot_pass_query.helper')
 const HTTPStatus = require('http-status');
 const moduleConfig = require('../config')
 const passwordResetHelper = require('../utils/update_password_helper')



 const internalHelper = {
  hasRecord: (list) => {
    return (list && (list.length > 0));
  },
  validateTokenStatus: (expiryTime, used) => {
    try {
      if (expiryTime < Date.now()) {
        return { success: false, message: "Token Expired" }
      }
      if (used) {
        return { success: false, message: "Token is already used" }
      }
      return { success: true, message: "" }
    } catch (error) {
      throw error;
    }
  },
  validatePw: (password, confirmPassword) => {
    try {
      return !!(password === confirmPassword);
    } catch (error) {
      throw error;
    }
  },
  checkPasswordStrength: password => {
    try {
      return moduleConfig.config.passwordStrengthRegex.test(String(password));
    } catch (error) {
      throw error;
    }
},
};
 
 module.exports = async (req, res, next) => {
   try {
     if (req && req.body) {

       const password = req?.body?.password;
       const confirmPassword = req?.body?.confirmPassword;
       const token = req?.body?.token;

       if (!token) {
        return res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus.BAD_REQUEST,
          message: moduleConfig.message.linkNotFound
        })
      }

      if (password && confirmPassword) {

        if (!internalHelper.validatePw(password, confirmPassword)) {
          return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: moduleConfig.message.passwordNotMatch
          })
        }


        if (!internalHelper.checkPasswordStrength(password)) {
          return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: moduleConfig.message.weakPassword
          })
        }

        const tokenInfo = await getForgotPassTokenDetailInfo(req, token);
        if (!tokenInfo) {
          return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: moduleConfig.message.linkNotFound
          })
        }

       const { success, message } = internalHelper.validateTokenStatus(tokenInfo.expiry_time,tokenInfo.used);
       if(!success){
        return res.status(HTTPStatus.NOT_FOUND).json({
          status: HTTPStatus.NOT_FOUND,
          message: message
        })
      }

      const tokenStatusUpdateRes = await updateTokenStatus(req, tokenInfo.userId);
      if (!tokenStatusUpdateRes) {
        return res.status(HTTPStatus.NOT_FOUND).json({
          status: HTTPStatus.NOT_FOUND,
          message: moduleConfig.message.passwordResetFail
        })
      }

      const passwordUpdateRes = await passwordResetHelper(req, tokenInfo.userId, password);
      if(!passwordUpdateRes){
        return res.status(HTTPStatus.NOT_FOUND).json({
          status: HTTPStatus.NOT_FOUND,
          message: moduleConfig.message.passwordResetFail
        })
      }

      return res.status(HTTPStatus.OK).json({
        status: HTTPStatus.OK,
        message: moduleConfig.message.passwordResetSuccess
      })

     }}
     //@send validation fail response
     return res.status(HTTPStatus.BAD_REQUEST).json({
       status: HTTPStatus.BAD_REQUEST,
       message: moduleConfig.message.passwordNotProvided
     })
 
   } catch (error) {
     return next(error);
   }
 }