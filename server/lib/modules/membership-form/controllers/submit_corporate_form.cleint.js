/**
 * @format
 * @author Binod Nagarkoti
 * @method postGeneralMembershipForm
 */

'use strict';

const { insert } = require('../utils/corporate_form_db_query.helper');
const HTTPStatus = require('http-status');
const { validateCorporateForm } = require('../utils/validation.utils');
const emailHelper = require('../../../helpers/email.helper');

const sendResetEmail = async (name) => {
    try {
        const companyName = name || '';

        const message = {
            email: process.env.ADMIN_EMAIL_RECEIVE_ID,
            title: 'Corporate membership registration notification',

            body: `<table>
      <tr>
          <td>
              <div class="text" style="padding: 0 2.5em; text-align: center;">
                  <h2>Dear Admin,</h2>
                  <h3>${companyName} organization has submitted a corporate member request in the system.</h3>
                  <p> Please log in to the website's backend to review the submission and respond as necessary.</p>
                  <p>Thank you for your attention to this matter.</p>
                  <p>Visit <a href="https://admin.nbimf.com/" class="btn btn-primary">Admin Dashboard</a></p>
              </div>
          </td>
      </tr>
  </table>`,
        };

        return emailHelper.sendMail(message);
    } catch (error) {
        throw error;
    }
};

module.exports = async (req, res, next) => {
    try {
        //@check user form validation
        const checkValidation = validateCorporateForm(req.body);
        if (checkValidation.isValid) {
            //@insert user data if valid
            const insertRes = await insert(req, req.body);
            if (insertRes) {
                await sendResetEmail(req.body?.organizationalInformation?.name);
                //@send success response
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    message:
                        'Thanks for joining with us. out team will view your request and send you an email.',
                });
            }

            //@send insert fail response
            return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                message: "We're sorry, but we were unable to save your changes.",
            });
        }

        //@send validation fail response
        return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: checkValidation.msg,
        });
    } catch (error) {
        return next(error);
    }
};
