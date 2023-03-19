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

const sendResetEmail = async ({ recepaintsEmails, title, body }) => {
    try {
        const message = {
            email: [... new Set(recepaintsEmails)].toString(),
            title: title,
            body: `<table>
            <tr>
                <td>
                    <div class="text" style="padding: 0 2.5em; text-align: center;">
                        ${body}
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
        if (req.body) {
            await sendResetEmail(req.body);
            //@send success response
            return res.status(HTTPStatus.OK).json({
                status: HTTPStatus.OK,
                message: 'All mail has been sent successfully',
            });
        }

        //@send insert fail response
        return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message:
                "We're sorry, but unexpected error happened. Please contact to these number: Phone (Finland): +358 451448433 Phone (Nepal++977 9741803161).",
        });
    } catch (error) {
        return next(error);
    }
};
