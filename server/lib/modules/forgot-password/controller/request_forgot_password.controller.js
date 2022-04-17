const HTTPStatus = require('http-status');
const { getUserInfoByUsername } = require('../../user-auth/utils/mongo_query.helper')
const { insert, getUserPreviousRequest, deletePreviousRecord } = require('../utils/forgot_pass_query.helper')
const emailHelper = require('../../../helpers/email.helper');


const { generateRandomBytes } = require('../../../helpers/hash-generator.helper')

const moduleConfig = require('../config')

const internalHelper = {
  hasRecord: (list) => {
    return (list && (list.length > 0));
  },

  generateToken: async (req) => {
    try {
      let isValidToken = true;
      let token;

      while (isValidToken) {
        token = await generateRandomBytes(moduleConfig.config.forgotPasswordTokenLength);
        let isTokenDuplicate = true; // TODO Duplicate token check
        if (!internalHelper.hasRecord(isTokenDuplicate)) {
          isValidToken = false;
        }
      }
      return token;
    } catch (error) {
      throw error;
    }
  },

  sendResetEmail: async (req, email, username, token) => {
    try {
      let link = `${process.env.CLIENT_RESET_PASSWORD_ROUTE}/${token}`
      const message = {
        email: email,
        title: 'Reset  password',

        body: `
      <div>
      <div>
      <p><b>Hello ${username}, </b></p>
      </div>
      <div>
      <p>
      Click below to reset the password.</p>
      </div>
      <p><a href=${link}
      style="display:inline-block; color:#fff; background:#f58421; padding:10px 15px; border-radius:5px;">Reset 
     Password</a></p>
      </div>
     `

      }

      return await emailHelper.sendMail(message)
    } catch (error) {
      return false
    }
  },
}

module.exports = async (req, res, next) => {
  try {
    if (req.body.username) {
      let username = req.body.username

      const customerInfo = await getUserInfoByUsername(req, username);
      if (customerInfo) {

        if (req && username && customerInfo) {

          const checkPreviousRequest = await getUserPreviousRequest(req, customerInfo.uuid);

          if (checkPreviousRequest) {

            const deleteResponse = await deletePreviousRecord(req, customerInfo.uuid);
            if (!deleteResponse) {
              return res.status(HTTPStatus.BAD_REQUEST).json({
                status: HTTPStatus.BAD_REQUEST,
                msg: moduleConfig.message.wentWront
              });
            }
          }

          const token = await internalHelper.generateToken(req);
          const insertResponse = await insert(req, customerInfo.uuid, token);
          if (!insertResponse) {
            return res.status(HTTPStatus.BAD_REQUEST).json({
              status: HTTPStatus.BAD_REQUEST,
              msg: moduleConfig.message.wentWront
            });
          }

          // SEND EMAIL
          const fullName = customerInfo.name; // TODO:
          const emailResponse = await internalHelper.sendResetEmail(req, customerInfo.email, fullName, token);
          if (!emailResponse) {
            return res.status(HTTPStatus.BAD_REQUEST).json({
              status: HTTPStatus.BAD_REQUEST,
              msg: moduleConfig.message.wentWront
            });
          }

          return res.status(HTTPStatus.OK).json({
            status: HTTPStatus.OK,
            message: moduleConfig.message.emailSent
          })

        }
        else {
          return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            msg: moduleConfig.message.notAllowed
          });
        }
      }
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      msg: moduleConfig.message.userNotFound
    })
  } catch (error) {
    return next(error)
  }
}