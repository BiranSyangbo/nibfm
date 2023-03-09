/**
 * @format
 * @author Binod Nagarkoti
 * @method updateStatus
 */

'use strict';

const {
    getCorporateFormDetail,
    corporateFormUpdateStatus,
} = require('../utils/corporate_form_db_query.helper');
const {
    getGeneralFormDetail,
    generalFormUpdateStatus,
} = require('../utils/general_form_db_query.helper');
const { generateHashPassword, generateSalt } = require('../../../helpers/bcrypt');
const {
    insert,
    getUserInfoByUsername,
    checkMemberId
} = require('../../../../lib/modules/user-auth/utils/mongo_query.helper');
const emailHelper = require('../../../helpers/email.helper');
const passwordGeneratorHelper = require('../../../helpers/password_generator_helper');
const HTTPStatus = require('http-status');
const moment = require("moment");

const internalFun = {
    registerUser: async (req, memberInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (req.body.isApproved === 1) {
                    const salt = await generateSalt();
                    const passwordAlgorithm = passwordGeneratorHelper.generatePassword(8);

                    const message = {
                        email: memberInfo.email,
                        title: 'Membership form approved.',
                        body: `
                        <table>
                        <tr>
                            <td>
                                <div class="text" style="padding: 0 2.5em; text-align: center;">
                                    <h2>Dear ${memberInfo.name},</h2>
                                    <h3>Your membership form is approved. Please use this Credentials for login our system.</h3>
                                    <p> Your <b>username</b> is : ${memberInfo.email}</p>
                                    <p> Your <b>password</b> is : ${passwordAlgorithm}</p>
                                    <p><a href="https://nbimf.com/login?username=${memberInfo.email}&password=${passwordAlgorithm}" class="btn btn-primary">Login</a></p>
                                </div>
                            </td>
                        </tr>
                    </table>`,
                    };

                    const hashPassword = await generateHashPassword(passwordAlgorithm, salt);
                    const insertIntoUserRes = await insert(req, memberInfo, hashPassword);
                    if (insertIntoUserRes) {
                        emailHelper.sendMail(message);
                        return resolve(true);
                    }
                    return resolve(false);
                } else {
                    //@send rejected mail to user
                    const message = {
                        email: memberInfo.email,
                        title: 'Membership form rejected.',
                        body: `
                        <table>
                        <tr>
                            <td>
                                <div class="text" style="padding: 0 2.5em; text-align: center;">
                                    <h2>Dear ${memberInfo.name},</h2>
                                    <h3>Thank you for your interest in our company.</h3>
                                    <p>I am sorry to inform you that your membership form has been rejected.</p>
                                    <p>Please contact our office so that we can further process your application.</p>

                                    <p style='margin-top:"5px"'>Thank you,</p>
                                </div>
                            </td>
                        </tr>
                    </table>
        `,
                    };
                    emailHelper.sendMail(message);
                    return resolve(true);
                }
            } catch (error) {
                return reject(error);
            }
        });
    },
    getMemberId: async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                let continueLoop = true;
                let memberId = null;
                while (continueLoop) {
                    const randomByte = Date.now().toString().slice(6);
                    let month = moment(new Date()).format("MM");
                    memberId = month + new Date().getFullYear().toString().slice(2) + "-" + randomByte;

                    const checkMemberIdExists = await checkMemberId(req, memberId);
                    if (!checkMemberIdExists || Object.keys(checkMemberIdExists).length === 0) {
                        continueLoop = false;
                    }
                }

                return resolve(memberId);
            } catch (error) {
                return reject(error);
            }
        })
    },
    getProfileYear: async (req) => {
        try {
            return req.db.collection("profile_year").findOne(
                {
                    deleted: false
                },
                {
                    projection: {
                        _id: 0,
                        profileYear: 1
                    }
                }
            )
        } catch (error) {
            throw error;
        }
    }
};

module.exports = async (req, res, next) => {
    try {
        if (req.params.uuid) {
            let projection = {};

            let data = {};
            let updateResponse = null;
            let registerUersRes = null;

            const profileYearObj = await internalFun.getProfileYear(req);
            //@check user type and do appect/reject operation
            if (req?.query?.formType === 'general') {
                projection = {
                    uuid: 1,
                    personalInformation: 1,
                    profileImage: 1
                };

                data = await getGeneralFormDetail(req, req.params.uuid, projection);
                const checkUser = await getUserInfoByUsername(
                    req,
                    data?.personalInformation?.email
                );
                if (checkUser && Object.keys(checkUser).length > 0) {
                    return res.status(HTTPStatus.NOT_FOUND).json({
                        status: HTTPStatus.NOT_FOUND,
                        message: "We're sorry, provided user email is already existed",
                    });
                }

                data.personalInformation['memberType'] = 'General';
                data.personalInformation['memberId'] = await internalFun.getMemberId(req);//data.uuid;
                data.personalInformation["profileImage"] = data['profileImage'] || "";

                data.personalInformation['profileYear'] = profileYearObj?.profileYear || null;
                registerUersRes = await internalFun.registerUser(req, data?.personalInformation);

                if (data && registerUersRes && Object.keys(data).length > 0) {
                    updateResponse = await generalFormUpdateStatus(req, req.params.uuid, profileYearObj, data.personalInformation['memberId']);
                    if (updateResponse) {
                        return res.status(HTTPStatus.OK).json({
                            status: HTTPStatus.OK,
                            message: 'We have successfully save your changes.',
                        });
                    }

                    return res.status(HTTPStatus.BAD_REQUEST).json({
                        status: HTTPStatus.BAD_REQUEST,
                        message: "We're sorry, but we were unable to save your changes.",
                    });
                }
            } else {
                projection = {
                    uuid: 1,
                    organizationalInformation: 1,
                    profileImage: 1
                };

                data = await getCorporateFormDetail(req, req.params.uuid, projection);

                const checkUser = await getUserInfoByUsername(
                    req,
                    data?.organizationalInformation?.email
                );
                if (checkUser && Object.keys(checkUser).length > 0) {
                    return res.status(HTTPStatus.NOT_FOUND).json({
                        status: HTTPStatus.NOT_FOUND,
                        message: "We're sorry, provided user email is already existed",
                    });
                }

                data.organizationalInformation['memberType'] = 'Corporate';
                data.organizationalInformation["profileImage"] = data['profileImage'] || "";
                data.organizationalInformation['memberId'] = await internalFun.getMemberId(req);
                data.organizationalInformation['profileYear'] = profileYearObj?.profileYear || null;

                registerUersRes = await internalFun.registerUser(
                    req,
                    data?.organizationalInformation
                );

                if (data && registerUersRes && Object.keys(data).length > 0) {
                    updateResponse = await corporateFormUpdateStatus(req, req.params.uuid, profileYearObj, data.organizationalInformation['memberId']);
                    if (updateResponse) {
                        return res.status(HTTPStatus.OK).json({
                            status: HTTPStatus.OK,
                            message: 'We have successfully save your changes.',
                        });
                    }

                    return res.status(HTTPStatus.BAD_REQUEST).json({
                        status: HTTPStatus.BAD_REQUEST,
                        message: "We're sorry, but we were unable to save your changes.",
                    });
                }
            }
        }

        return res.status(HTTPStatus.NOT_FOUND).json({
            status: HTTPStatus.NOT_FOUND,
            message: 'Data not found.',
        });
    } catch (error) {
        return next(error);
    }
};
