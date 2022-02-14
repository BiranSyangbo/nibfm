/**
 * @author janak
 * @method postGeneralMembershipForm
 */


 'use strict';

 const { insert } = require('../utils/general_form_db_query.helper')
 const HTTPStatus = require('http-status');
 const { insertValidation } = require('../utils/validation.utils');
 
 module.exports = async (req, res, next) => {
   try {
 
     //@check user form validation
     const checkValidation = insertValidation(req.body);
     if (checkValidation.isValid) {
 
       //@insert user data if valid
       const insertRes = await insert(req, req.body);
       if (insertRes) {
 
         //@send success response 
         return res.status(HTTPStatus.OK).json({
           status: HTTPStatus.OK,
           message: "Insert success."
         })
       }
 
       //@send insert fail response
       return res.status(HTTPStatus.BAD_REQUEST).json({
         status: HTTPStatus.BAD_REQUEST,
         message: "Insert failed."
       })
     }
 
     //@send validation fail response
     return res.status(HTTPStatus.BAD_REQUEST).json({
       status: HTTPStatus.BAD_REQUEST,
       message: checkValidation.msg
     })
 
   } catch (error) {
     return next(error);
   }
 }