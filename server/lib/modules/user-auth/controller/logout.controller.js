/** @format */

const HTTPStatus = require('http-status');
const { getUserLoginInfo, deleteUserLoginInfo } = require('../utils/mongo_query.helper');

module.exports = async (req, res, next) => {
    try {
        console.log("logout controller initialize");

        const checkJwtTokenInfo = await getUserLoginInfo(req, req.decoded.userId);
        console.log("user jwt info ", checkJwtTokenInfo);

        if (checkJwtTokenInfo && Object.keys(checkJwtTokenInfo).length > 0) {
            const deleteResponse = await deleteUserLoginInfo(req.db, checkJwtTokenInfo._id);
            if (deleteResponse) {
                console.log("logout success");
                return res.status(HTTPStatus.OK).json({
                    status: HTTPStatus.OK,
                    msg: 'You have successfully logged out of your account. Thank you for using our service.',
                });
            }
        }
        console.log("logout failed msg")
        return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            msg: 'Logout fail.',
        });
    } catch (error) {
        return next(error);
    }
};
