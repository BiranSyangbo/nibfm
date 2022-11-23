/**
 * @author janak
 * @method getBlogRequestDetail
 */

'use strict';

const { checkBlogInfo } = require('../utils/db_query.helper')
const HTTPStatus = require('http-status');


module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {


      const projection = {
        uuid: 1,
        title: 1,
        author: 1,
        content: 1,
        publishedDate: 1,
        images: 1,
        isActive: 1,
        metaTags: 1,
        slug: 1
      }
      let data = await checkBlogInfo(req, req.params.uuid, projection)

      if (data) {

        data.image = data.images;
        delete data.images;

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