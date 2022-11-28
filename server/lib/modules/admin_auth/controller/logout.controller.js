/** @format */

const HTTPStatus = require('http-status');
const { getUserLoginInfo, deleteUserLoginInfo } = require('../utils/mongo_query.helper');
module.exports = async (req, res, next) => {
    try {
        const checkJwtTokenInfo = await getUserLoginInfo(req, req.decoded.userId);

        if (checkJwtTokenInfo && Object.keys(checkJwtTokenInfo).length > 0) {
            const deleteResponse = await deleteUserLoginInfo(req.db, checkJwtTokenInfo._id);
            if (deleteResponse) {
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    msg: 'You have successfully logged out of your account. Thank you for using our service.',
                });
            }
        }
        return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            msg: 'Logout fail.',
        });
    } catch (error) {
        return next(error);
    }
};
