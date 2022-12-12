/**
 * @author janak
 * @method postGeneralMembershipForm
 */


'use strict';

const { insert } = require('../utils/general_form_db_query.helper')
const HTTPStatus = require('http-status');
const { validateGeneralForm } = require('../utils/validation.utils');

const emailHelper = require('../../../helpers/email.helper');

const sendResetEmail = async (name) => {
  try {
    const username = name || "";

    const message = {
      email: process.env.ADMIN_EMAIL_RECEIVE_ID,
      title: 'Membership registration notification',

      body: `
     <div>
     <div>
       <p><b>Dear Admin,</b></p>
     </div>
     <div>
     <div>
     <p>
      ${username} user has submitted a general member request in the system.
     </p>
     <p> 
       Please log in to the website's backend to review the submission and respond as necessary.
     </p>
     </div>
     <div>
       <p>
         Thank you for your attention to this matter.
       </p>
     </div>
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
    const checkValidation = validateGeneralForm(req.body);
    if (checkValidation.isValid) {

      //@insert user data if valid
      const insertRes = await insert(req, req.body);
      if (insertRes) {

        await sendResetEmail(req.body?.personalInformation?.name);
        //@send success response
        return res.status(HTTPStatus.OK).json({
          status: HTTPStatus.OK,
          message: "Thanks for joining with us. out team will view your request and send you an email."
        })
      }

      //@send insert fail response
      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: HTTPStatus.BAD_REQUEST,
        message: "We're sorry, but we were unable to save your changes."
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