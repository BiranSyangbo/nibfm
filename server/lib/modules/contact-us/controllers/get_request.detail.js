/**
 * @author lekhrazz
 * @method getContactUsRequestDetail
 */

'use strict';

const { getContactUsDetail } = require('../utils/db_query.helper')
const HTTPStatus = require('http-status');


module.exports = async (req, res, next) => {
  try {

    if (req.params.uuid) {

      
      const projection = {
        name: 1,
        email: 1,
        message: 1
      }
      const data = await getContactUsDetail(req, req.params.uuid, projection)

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