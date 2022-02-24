/**
 * @author janak
 * @method updateCorporateForms
 */


 'use strict';

 const { update } = require('../utils/corporate_form_db_query.helper')
 const HTTPStatus = require('http-status');
 const { insertValidation } = require('../utils/validation.utils');
 
 module.exports = async (req, res, next) => {
   try {
 
     //@check user form validation
     const checkValidation = insertValidation(req.body);
     const projection = {
      uuid: 1
      }
      let tableId = req?.params?.uuid;

      //Validate id : TODO

     
     if (tableId) {
 
       //@insert user data if valid
       const updateRes = await update(req, req.body,tableId);
       if (updateRes) {
 
         //@send success response 
         return res.status(HTTPStatus.OK).json({
           status: HTTPStatus.OK,
           message: "Update success."
         })
       }
 
       //@send insert fail response
       return res.status(HTTPStatus.BAD_REQUEST).json({
         status: HTTPStatus.BAD_REQUEST,
         message: "Update failed."
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