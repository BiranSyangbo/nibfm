
 'use strict';

 const { getDonationListForCustomer } = require('../utils/db_query.utils')
 const HTTPStatus = require('http-status');
 

 
 module.exports = async (req, res, next) => {
   try {
 
     const dataList = await getDonationListForCustomer(req);
 
     if (dataList && dataList.length > 0) {
       return res.status(HTTPStatus.OK).json({
         status: HTTPStatus.OK,
         message: "Data fetched.",
         dataList,
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