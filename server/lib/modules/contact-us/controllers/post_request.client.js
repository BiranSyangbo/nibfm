/**
 * @author lekhrazz
 * @method postContactUs
 */


'use strict';

const { insert } = require('../utils/db_query.helper')
const HTTPStatus = require('http-status');
const { insertValidation } = require('../utils/validation.utils');
const emailHelper = require('../../../helpers/email.helper');

const sendResetEmail = async (name) => {
  try {
    const username = name || "";

    const message = {
      email: process.env.ADMIN_EMAIL_RECEIVE_ID,
      title: 'Contact us notification',

      body: `
    <div>
    <div>
    <p>Dear Admin,

    User ${username} has dropped a contact request in the system. Please log in to the website's backend to review the submission and respond as necessary.
    
    Thank you for your attention to this matter.
    </p>
    </div>
    </div>
   `

    }

    return emailHelper.sendMail(message)
  } catch (error) {
    throw error;
  }
}

module.exports = async (req, res, next) => {
  try {

    //@check user form validation
    const checkValidation = insertValidation(req.body);
    if (checkValidation.isValid) {

      //@insert user data if valid
      const insertRes = await insert(req, req.body);
      if (insertRes) {

        await sendResetEmail(req.body.name);
        //@send success response
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          message: "Thank you for reaching out to us"
        })
      }

      //@send insert fail response
      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: HTTPStatus.BAD_REQUEST,
        message: "We're sorry, but unexpected error happened. Please contact to these number: Phone (Finland): +358 451448433 Phone (Nepal++977 9741803161)."
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