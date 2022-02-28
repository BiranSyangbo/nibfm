/**
 * @author janak
 * @method getAboutUs
 */

 'use strict';

 const { getDetailsInfo } = require('../utils/db_query.helper')
 const HTTPStatus = require('http-status');
 
 
 module.exports = async (req, res, next) => {
   try {
 
     if (req) {
 
       const projection = {
         _id : 1,
         title :1,
         slug : 1,
         description : 1,
         image : 1,
         isActive : 1,
         metaTags : 1,
         deleted : 1
       }
       const data = await getDetailsInfo(req, projection)
 
       if (data) {
         return res.status(HTTPStatus.OK).json({
           status: HTTPStatus.OK,
           message: "Data fetched.",
           data
         })
       }
 
       return res.status(HTTPStatus.NOT_FOUND).json({
         status: HTTPStatus.NOT_FOUND,
         message: "Data not found."
       })
     }
 
     return res.status(HTTPStatus.NOT_FOUND).json({
       status: HTTPStatus.NOT_FOUND,
       message: "Data not found."
     })
   } catch (error) {
     return next(error);
   }
 }