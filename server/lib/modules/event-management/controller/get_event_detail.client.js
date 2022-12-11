/** @format */

'use strict';

const { checkDonationExists, getDetails} = require('../utils/db_query.utils');
const HTTPStatus = require('http-status');
module.exports = async (req, res, next) => {
    try {
        if (req.params.slug) {
            const projection = {
                uuid: 1,
                title: 1,
                slug: 1,
                author: 1,
                description: 1,
                date: 1,
                meta: 1,
                image: 1,
            };
            const data = await getDetails(req, req.params.slug, projection);

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
