/**
 * @author Binod Nagarkoti
 * @method updateAboutUs
 */


'use strict';

const { update } = require('../utils/db_query.helper')
const HTTPStatus = require('http-status');

module.exports = async (req, res, next) => {
  try {

    if (req.body) {

      //@insert user data if valid
      const updateRes = await update(req, req.body);
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