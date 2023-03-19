/**
 * @format
 * @author Binod Nagarkoti
 * @method postNewsletter
 */

'use strict';

const { insert } = require('../utils/db_query.helper');
const HTTPStatus = require('http-status');
const { insertValidation } = require('../utils/validation.utils');
const emailHelper = require('../../../helpers/email.helper');

const sendResetEmail = async (email) => {
    try {
        const username = name || '';

        const message = {
            email: process.env.ADMIN_EMAIL_RECEIVE_ID,
            title: 'New Subscriber Notification',

            body: `<table>
      <tr>
          <td>
              <div class="text" style="padding: 0 2.5em; text-align: center;">
                  <h2>Dear Admin,</h2>
                  <h3>A user having email: ${email} has subscribed to the NBIMF newsletter. Please check the database for more information.</h3>
                  <p>Please log in to the website's backend to view and send message.</p>
                  <p>Thank you for your attention to this matter.</p>
                  <p>Visit <a href="https://admin.nbimf.com/" class="btn btn-primary">Admin Dashboard</a></p>
              </div>
          </td>
      </tr>
  </table>
   `,
        };

        return emailHelper.sendMail(message);
    } catch (error) {
        throw error;
    }
};

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
                    message: 'Thank you for reaching out to us',
                });
            }

            //@send insert fail response
            return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                message:
                    "We're sorry, but unexpected error happened. Please contact to these number: Phone (Finland): +358 451448433 Phone (Nepal++977 9741803161).",
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
