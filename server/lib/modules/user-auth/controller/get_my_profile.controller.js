/**
 * @format
 * @author janak
 * @method getMyProfile
 */

'use strict';

const { getUserInfoByUserId } = require('../utils/mongo_query.helper');
const HTTPStatus = require('http-status');

module.exports = async (req, res, next) => {
    try {
        let userId = req.decoded.userId;
        if (userId && req) {
            const projection = {
                uuid: 1,
                email: 1,
                memberId: 1,
                profileYear: 1,
                name: 1,
                phoneNumber: 1,
                dateOfBirthBs: 1,
                dateOfBirthAd: 1,
                nationality: 1,
                necLicenseNumber: 1,
                address: 1,
                memberType: 1
            };
            const data = await getUserInfoByUserId(req, projection, userId);

            if (data) {
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    message: 'All data has been successfully fetched',
                    data,
                });
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
