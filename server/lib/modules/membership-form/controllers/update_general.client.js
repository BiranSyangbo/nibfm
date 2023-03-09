/**
 * @format
 * @author Binod Nagarkoti
 * @method updateGeneralForms
 */

'use strict';

const { update } = require('../utils/general_form_db_query.helper');
const HTTPStatus = require('http-status');
const { validateGeneralForm } = require('../utils/validation.utils');

module.exports = async (req, res, next) => {
    try {
        //@check user form validation
        const checkValidation = validateGeneralForm(req.body);
        const projection = {
            uuid: 1,
        };
        let tableId = req?.params?.uuid;

        //Validate id : TODO

        if (tableId) {
            //@insert user data if valid
            const updateRes = await update(req, req.body, tableId);
            if (updateRes) {
                //@send success response
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    message: 'We’ve saved your profile changes',
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
