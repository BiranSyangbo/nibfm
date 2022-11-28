/** @format */

'use strict';

const { checkDonationExists } = require('../utils/db_query.utils');
const HTTPStatus = require('http-status');
const donationDetailProjection = {
    _id: 1,
    date: 1,
    donerName: 1,
    donerCountry: 1,
    amount: 1,
    currency: 1,
    isAnonymous: 1,
    createdAt: 1,
};

module.exports = async (req, res, next) => {
    try {
        if (req.params.uuid) {
            const donationDetailInfo = await checkDonationExists(
                req,
                req.params.uuid,
                donationDetailProjection
            );

            if (donationDetailInfo && Object.keys(donationDetailInfo).length > 0) {
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    message: 'All data has been successfully fetched',
                    data: donationDetailInfo,
                });
            }
        }

        return res.status(HTTPStatus.NOT_FOUND).json({
            status: HTTPStatus.NOT_FOUND,
            message: "We're sorry, but we were unable to find the data you were looking for.",
        });
    } catch (error) {
        return next(error);
    }
};
