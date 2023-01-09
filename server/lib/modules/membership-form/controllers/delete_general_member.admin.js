/**
 * @format
 * @author binod
 * @method deleteMember
 */

'use strict';

const { deleteGeneralMember,checkGeneralInfo } = require('../utils/general_form_db_query.helper');

const HTTPStatus = require('http-status');

module.exports = async (req, res, next) => {
    try {
        const projection = {
            uuid: 1,
        };
        let memberId = req?.params?.uuid;
        const memberInfo = await checkGeneralInfo(req, memberId, projection);
        if (!memberInfo) {
            return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                message: "We're sorry, but we were unable to find the data you were looking for."
            });
        }

        if (memberInfo) {
            const updateRes = await deleteGeneralMember(req, memberId);
            if (updateRes) {
                //@send success response
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    message: 'we have successfully removed the member details.',
                });
            }

            //@send insert fail response
            return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                message: "We're sorry, but cloudn't delete the member details.",
            });
        }

        //@send validation fail response
        return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: "We're sorry, but we couldn't any member detailss",
        });
    } catch (error) {
        return next(error);
    }
};
