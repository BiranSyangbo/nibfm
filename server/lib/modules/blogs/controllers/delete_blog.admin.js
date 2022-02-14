/**
 * @author janak
 * @method deleteBlog
 */


 'use strict';

 const { deleteBlog,checkBlogInfo } = require('../utils/db_query.helper')
 const HTTPStatus = require('http-status');
 const { insertValidation } = require('../utils/validation.utils');
 
 module.exports = async (req, res, next) => {
   try {
     const projection = {
      uuid: 1
      }
      let blogId = req?.params?.uuid;
      const blogInfo = await checkBlogInfo(req, blogId, projection)
      if(! blogInfo){
        return res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus.BAD_REQUEST,
          message: "Blog id was not found"
        })
        }

     if (blogInfo) {
       const updateRes = await deleteBlog(req,blogId);
       if (updateRes) {
 
         //@send success response 
         return res.status(HTTPStatus.OK).json({
           status: HTTPStatus.OK,
           message: "Delete success."
         })
       }
 
       //@send insert fail response
       return res.status(HTTPStatus.BAD_REQUEST).json({
         status: HTTPStatus.BAD_REQUEST,
         message: "Delete failed."
       })
     }
 
     //@send validation fail response
     return res.status(HTTPStatus.BAD_REQUEST).json({
       status: HTTPStatus.BAD_REQUEST,
       message: 'Data not foud'
     })
 
   } catch (error) {
     return next(error);
   }
 }