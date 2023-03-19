/**
 * @format
 * @author Binod Nagarkoti
 * @method getNewsletterRequestDetail
 */

'use strict';

const { getNewsletterDetail } = require('../utils/db_query.helper');
const HTTPStatus = require('http-status');

module.exports = async (req, res, next) => {
    try {
        if (req.params.uuid) {
            const projection = {
                email: 1,
            };
            const data = await getNewsletterDetail(req, req.params.uuid, projection);

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
