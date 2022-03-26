
 'use strict';

 const { getList, countTotalItems } = require('../utils/db_query.utils')
 const HTTPStatus = require('http-status');
 
 const pagerOptsHelper = (req) => {
   try {
     const page = req.query.page ? parseInt(req.query.page) : 1;
     const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
     const offset = (page - 1) * perPage;
     return { page, perPage, offset }
   } catch (error) {
     throw error;
   }
 }
 
 module.exports = async (req, res, next) => {
   try {
     const pagerOpts = pagerOptsHelper(req);
 
     let queryOpts = {
       deleted: false
     };
 
     if (req.query.filter && req.query.filter['donerName']) {
       queryOpts.donerName = {
         $regex: new RegExp('.*' + req.query.filter['donerName'], "i")
       }
     }
 
     const [dataList, count] = await Promise.all([
       getList(req, queryOpts, pagerOpts),
       countTotalItems(req, queryOpts)
     ])
 
     if (dataList && dataList.length > 0) {
       return res.status(HTTPStatus.OK).json({
         status: HTTPStatus.OK,
         message: "Data fetched.",
         dataList,
         pagination: {
           totalItems: count,
           totalPages: Math.ceil(count / pagerOpts.perPage),
           perPage: pagerOpts.perPage,
           currentPage: pagerOpts.page
         }
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