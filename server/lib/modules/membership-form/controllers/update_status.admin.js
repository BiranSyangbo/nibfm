/**
 * @format
 * @author janak
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
} = require('../../../../lib/modules/user-auth/utils/mongo_query.helper');
const emailHelper = require('../../../helpers/email.helper');
const passwordGeneratorHelper = require('../../../helpers/password_generator_helper');

const HTTPStatus = require('http-status');
const { reject } = require('bluebird');

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
                        body: `<tr>
          <td valign="middle" style="padding:0 1.5em">
          <div>
              <p><b>Dear ${memberInfo.name}, </b></p>
              <p>
              Your membership form is approved. Please use this Credentials for login our system.</p>
                <p> Your username is : ${memberInfo.email}</p>
                <p> Your password is : ${passwordAlgorithm}</p>
              </div>
            </td>
        </tr>`,
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
          <tr>
          <td valign="middle" style="padding:0 1.5em">
          <div>
              <p><b>Dear ${memberInfo.name}, </b></p>
              <p>Thank you for your interest in our company.</p>
              <p>I am sorry to inform you that your membership form has been rejected.</p>
              <p>Please contact our office so that we can further process your application.</p>

              Thank you,</p>
          </div>
          </td>
          </tr>
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
};

module.exports = async (req, res, next) => {
    try {
        if (req.params.uuid) {
            let projection = {};

            let data = {};
            let updateResponse = null;
            let registerUersRes = null;

            //@check user type and do appect/reject operation
            if (req?.query?.formType === 'general') {
                projection = {
                    uuid: 1,
                    personalInformation: 1,
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
                data.personalInformation['memberId'] = data.uuid;
                registerUersRes = await internalFun.registerUser(req, data?.personalInformation);

                if (data && registerUersRes && Object.keys(data).length > 0) {
                    updateResponse = await generalFormUpdateStatus(req, req.params.uuid);
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
                data.organizationalInformation['memberId'] = data.uuid;

                registerUersRes = await internalFun.registerUser(
                    req,
                    data?.organizationalInformation
                );

                if (data && registerUersRes && Object.keys(data).length > 0) {
                    updateResponse = await corporateFormUpdateStatus(req, req.params.uuid);
                    if (updateResponse) {
                        return res.status(HTTPStatus.OK).json({
                            status: HTTPStatus.OK,
                            message: "We have successfully save your changes.",
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
