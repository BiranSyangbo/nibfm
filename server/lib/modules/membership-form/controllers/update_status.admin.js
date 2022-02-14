/**
 * @author janak
 * @method updateStatus
 */

 'use strict';

 const { getCorporateFormDetail, corporateFormUpdateStatus } = require('../utils/corporate_form_db_query.helper');
 const { getGeneralFormDetail, generalFormUpdateStatus } = require('../utils/general_form_db_query.helper');


 const HTTPStatus = require('http-status');
 
 
 module.exports = async (req, res, next) => {
   try {
 
     if (req.params.uuid) {
 
       const projection = {
         uuid: 1
       }

       let data = {}
       let updateResponse = null

       if (req?.query?.formType==='general'){

          data = await getGeneralFormDetail(req, req.params.uuid, projection)

          if (data && Object.keys(data).length > 0) {
 
            updateResponse = await generalFormUpdateStatus(req, req.params.uuid);
            if (updateResponse) {
              return res.status(HTTPStatus.OK).json({
                status: HTTPStatus.OK,
                message: "Update success."
              })
            }
    
            return res.status(HTTPStatus.BAD_REQUEST).json({
              status: HTTPStatus.BAD_REQUEST,
              message: "Update fail."
            })
    
          }
       }
       data = await getCorporateFormDetail(req, req.params.uuid, projection)

       if (data && Object.keys(data).length > 0) {

         updateResponse = await corporateFormUpdateStatus(req, req.params.uuid);
         if (updateResponse) {
           return res.status(HTTPStatus.OK).json({
             status: HTTPStatus.OK,
             message: "Update success."
           })
         }
 
         return res.status(HTTPStatus.BAD_REQUEST).json({
           status: HTTPStatus.BAD_REQUEST,
           message: "Update fail."
         })
 
       }


     }
 
     return res.status(HTTPStatus.NOT_FOUND).json({
       status: HTTPStatus.NOT_FOUND,
       message: "Data not found."
     })
   } catch (error) {
     return next(error);
   }
 }