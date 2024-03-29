/** @format */

'use strict';

const { getList, countTotalItems } = require('../utils/db_query.utils');
const HTTPStatus = require('http-status');
const projectionField = {
    uuid: 1,
    title: 1,
    slug: 1,
    author: 1,
    description: 1,
    date: 1,
    meta: 1,
    image: 1,
};

// const pagerOptsHelper = (req) => {
//     try {
//         const page = req.query.page ? parseInt(req.query.page) : 1;
//         const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
//         const offset = (page - 1) * perPage;
//         return { page, perPage, offset };
//     } catch (error) {
//         throw error;
//     }
// };

module.exports = async (req, res, next) => {
    try {

        let queryOpts = {
            deleted: false,
        };

        const [dataList, count] = await Promise.all([
            getList(req, queryOpts, projectionField),
            countTotalItems(req, queryOpts),
        ]);
        if (dataList && dataList.length > 0) {
            return res.status(HTTPStatus.OK).json({
                status: HTTPStatus.OK,
                message: 'All data has been successfully fetched',
                dataList,
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
