/**
 * @author Janak
 * @method getForgotPasswordStatus
 */

 'use strict';

 const { getTokenDetailInfo } = require('../utils/forgot_pass_query.helper')
 const HTTPStatus = require('http-status');
const moduleConfig = require('../config')


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
  }
};
 
 module.exports = async (req, res, next) => {
   try {
 
     if (req.query.token) {
 
  
       const tokenInfo = await getTokenDetailInfo(req, req?.query?.token);
 
       if (!tokenInfo) {
        return res.status(HTTPStatus.NOT_FOUND).json({
          status: HTTPStatus.NOT_FOUND,
          message: moduleConfig.message.linkNotFound
        })
       }

       const { success, message } = internalHelper.validateTokenStatus(tokenInfo.expiry_time,tokenInfo.used);
       if(success){
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          message: "Your token was verified, Here is the new token for further process",
          token : tokenInfo.uuid
        })
      }

      return res.status(HTTPStatus.NOT_FOUND).json({
        status: HTTPStatus.NOT_FOUND,
        message: moduleConfig.message.linkNotFound
      })
       }
       
     return res.status(HTTPStatus.NOT_FOUND).json({
       status: HTTPStatus.NOT_FOUND,
       message: moduleConfig.message.wentWront 
     })
   } catch (error) {
     return next(error);
   }
 }