/**
 * @format
 * @author Binod Nagarkoti
 * @method deleteBlog
 */

'use strict';

const { deleteBlog, checkBlogInfo } = require('../utils/db_query.helper');
const HTTPStatus = require('http-status');
const { insertValidation } = require('../utils/validation.utils');

module.exports = async (req, res, next) => {
    try {
        const projection = {
            uuid: 1,
        };
        let blogId = req?.params?.uuid;
        const blogInfo = await checkBlogInfo(req, blogId, projection);
        if (!blogInfo) {
            return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                message: "We're sorry, but we were unable to find the data you were looking for."
            });
        }

        if (blogInfo) {
            const updateRes = await deleteBlog(req, blogId);
            if (updateRes) {
                //@send success response
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    message: 'we have successfully removed the blog post.',
                });
            }

            //@send insert fail response
            return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                message: "We're sorry, but cloudn't delete the blog.",
            });
        }

        //@send validation fail response
        return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: "We're sorry, but we couldn't any blog posts",
        });
    } catch (error) {
        return next(error);
    }
};
