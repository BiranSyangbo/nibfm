/**
 * @author Binod Nagarkoti
 * @method uploadImages
 */
'use strict';

const HTTPStatus = require('http-status');
module.exports = async (req, res, next) => {
  try {
    let responseData = null;
    if (req) {
      responseData = {
        imageUrl: req.location
      }
    }
    if (responseData) {
      return res.status(HTTPStatus.OK).json({
        status: HTTPStatus.Ok,
        err: false,
        success: true,
        message: "Image file has been successfully uploaded",
        data: responseData
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