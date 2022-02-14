/**
 * @author janak
 * @method updateBlogPost
 */


 'use strict';

 const { updateBlog,checkBlogInfo } = require('../utils/db_query.helper')
 const HTTPStatus = require('http-status');
 const { insertValidation } = require('../utils/validation.utils');
 
 module.exports = async (req, res, next) => {
   try {
 
     //@check user form validation
     const checkValidation = insertValidation(req.body);
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
      

      //TODO slug validation
     //const checkSlug 

     
     if (checkValidation.isValid) {
 
       //@insert user data if valid
       const updateRes = await updateBlog(req, req.body,blogId);
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