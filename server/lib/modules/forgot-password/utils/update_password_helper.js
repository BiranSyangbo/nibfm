const { generateSalt,generateHashPassword } = require('../../../helpers/bcrypt');
const { updatePassword } = require('../../user-auth/utils/mongo_query.helper')


module.exports = async(req ,userId,newPassword) => {
    try {
       
        const salt = await generateSalt();
        const password = await generateHashPassword(newPassword, salt);
        return await updatePassword(req,userId,password)
    } catch (error) {
      throw error;
    }
  }