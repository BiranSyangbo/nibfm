/**
 * @format
 * @author Binod Nagarkoti
 * @method getAboutUs
 */

'use strict';

const { getDetails } = require('../utils/db_query.helper');
const HTTPStatus = require('http-status');

module.exports = async (req, res, next) => {
    try {
        const projection = {
            uuid: 1,
            title: 1,
            description: 1,
            images: 1,
            isActive: 1,
            metaTags: 1,
            deleted: 1,
        };
        const data = await getDetails(req, projection);

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

        return res.status(HTTPStatus.NOT_FOUND).json({
            status: HTTPStatus.NOT_FOUND,
            message: "We're sorry, but we were unable to find the data you were looking for.",
        });
    } catch (error) {
        return next(error);
    }
};
