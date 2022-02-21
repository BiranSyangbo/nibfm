const { loginPayloadValidation } = require('../utils/validation.helper')
const HTTPStatus = require('http-status');
const { getUserInfoByUsername, insertLoginInfo } = require('../utils/mongo_query.helper');
const { verifyPassword } = require('../../../helpers/bcrypt');
const { generateJWTToken } = require('../../../helpers/jwt.helper');
const uuid = require('uuid')


const checkUserStatus = userinfo => {
  try {
    if (userinfo.type === 'user') return { success: true, msg: '' };
    if (userinfo.active === false) return { success: false, msg: 'User is inactive' };
    if (userinfo.blocked === true) return { success: false, msg: 'User is blocked.' };
    return { success: true, msg: '' }
  } catch (error) {
    throw error;
  }
}

const generateLoginSessionInfo = (userinfo, token) => {
  try {
    return {
      _id: uuid.v4(),
      user: userinfo._id,
      token: token,
      expiry_time: new Date().setDate(new Date().getDate() + 1),  // increment date by 1 day store in epoch time
      deleted: false
    }
  } catch (error) {
    throw error;
  }
}
module.exports = async (req, res, next) => {
  try {

    const { isValid, msg } = loginPayloadValidation(req.body);

    if (isValid) {

      const userInfo = await getUserInfoByUsername(req, req.body.username);
      if (userInfo && Object.keys(userInfo).length > 0) {

        //@match user password 
        const match = await verifyPassword(req.body.password, userInfo.password)
        if (match) {

          //@check user is allowed to login or not
          const userStatusResponse = checkUserStatus(userInfo);
          if (userStatusResponse.success) {

            //@generate jwt token if everything is okay
            const token = await generateJWTToken({
              _id: userInfo._id,
              role: userInfo.type
            });

            const loginSessionInfo = generateLoginSessionInfo(userInfo, token);

            const insertLoginSessionResponse = await insertLoginInfo(req.db, loginSessionInfo);
            if (insertLoginSessionResponse) {

              return res.status(HTTPStatus.OK).json({
                status: HTTPStatus.OK,
                msg: "Login success.",
                token: token
              })
            }
          }
          return res.status(HTTPStatus.UNAUTHORIZED).json({
            status: HTTPStatus.UNAUTHORIZED,
            msg: userStatusResponse.msg
          })


        }

      }

      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: HTTPStatus.BAD_REQUEST,
        msg: "Invalid credential provided."
      })
    }

    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus.BAD_REQUEST,
      msg: msg
    })
  } catch (error) {
    return next(error)
  }
}