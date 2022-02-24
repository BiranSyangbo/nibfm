const { verifyPassword, generateSalt,generateHashPassword } = require('../../../helpers/bcrypt');
const { updatePassword, getUserInfoByUserId } = require('../utils/mongo_query.helper')


module.exports = async(req, changePasswordObj ,userId,currentPassword) => {
    try {
        const oldPassword = changePasswordObj.oldPassword;
        const newPassword = changePasswordObj.newPassword;

        const validPw = await  verifyPassword(oldPassword, currentPassword)
        if (!validPw){
            return null;
        }
        const salt = await generateSalt();
        const password = await generateHashPassword(newPassword, salt);
        return await updatePassword(req,userId,password)
    } catch (error) {
      throw error;
    }
  }