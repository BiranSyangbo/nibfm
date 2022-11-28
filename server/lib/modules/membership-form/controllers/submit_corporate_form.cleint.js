/**
 * @author janak
 * @method postGeneralMembershipForm
 */


 'use strict';

 const { insert } = require('../utils/corporate_form_db_query.helper')
 const HTTPStatus = require('http-status');
 const { validateCorporateForm } = require('../utils/validation.utils');

 module.exports = async (req, res, next) => {
   try {

     //@check user form validation
     const checkValidation = validateCorporateForm(req.body);
     if (checkValidation.isValid) {

       //@insert user data if valid
       const insertRes = await insert(req, req.body);
       if (insertRes) {

         //@send success response
         return res.status(HTTPStatus.OK).json({
           status: HTTPStatus.OK,
           message: "Thanks for joining with us. out team will view your request and send you an email."
         })
       }

       //@send insert fail response
       return res.status(HTTPStatus.BAD_REQUEST).json({
         status: HTTPStatus.BAD_REQUEST,
         message: "We're sorry, but we were unable to save your changes."
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