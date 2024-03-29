/**
 * @format
 * @author Binod Nagarkoti
 * @method getUserCorporateFormInfo
 */

'use strict';

const { getCorporateFormDetail } = require('../utils/corporate_form_db_query.helper');
const { getUserInfoByUserId } = require('../utils/../../user-auth/utils/mongo_query.helper');

const HTTPStatus = require('http-status');

module.exports = async (req, res, next) => {
    try {
        let userId = req.decoded.userId;
        if (userId && req) {
            let projection = {
                uuid: 1,
            };

            const userInfo = await getUserInfoByUserId(req, projection, userId);
            if (userInfo) {
                projection = {
                    uuid: 1,
                    date: 1,
                    corporateMembershipNumber: 1,
                    enterpriseSize: 1,
                    profileImage: 1,
                    enterpriseSizeType: 1,
                    membershipPeriod: 1,
                    organizationalInformation: 1,
                    deleted: 1,
                };

                const data = await getCorporateFormDetail(req, userInfo.uuid, projection);

                if (data) {
                    return res.status(HTTPStatus.OK).json({
                        status: HTTPStatus.OK,
                        message: 'All data has been successfully fetched',
                        data,
                    });
                }
            }

            return res.status(HTTPStatus.NOT_FOUND).json({
                status: HTTPStatus.NOT_FOUND,
                message: "We're sorry, but we were unable to find the data you were looking for.",
            });
        }

        return res.status(HTTPStatus.NOT_FOUND).json({
            status: HTTPStatus.NOT_FOUND,
            message: "We're sorry, but we were unable to find the data you were looking for.",
        });
    } catch (error) {
        return next(error);
    }
};
