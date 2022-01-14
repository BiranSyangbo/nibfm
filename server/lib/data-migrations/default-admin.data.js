const mongodbHelper = require('../helpers/mongodb.helper')

const { generateHashPassword, generateSalt } = require('../helpers/bcrypt');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {

      const dbConnection = await mongodbHelper();
      const checkSuperadminExistsOrNot = await dbConnection.collection(process.env.ADMIN_COLLECTION).findOne({
        deleted: false,
        email: process.env.SUPER_ADMIN_USERNAME
      });
      if (!checkSuperadminExistsOrNot || Object.keys(checkSuperadminExistsOrNot).length < 1) {
        console.log('superadmin does not exist');

        const salt = await generateSalt();
        const hashPassword = await generateHashPassword(process.env.SUPER_ADMIN_PWD, salt);

        const superAdminInfo = {
          _id: process.env.SUPER_ADMIN_ID,
          password: hashPassword,
          email: process.env.SUPER_ADMIN_USERNAME,
          deleted: false,
          type: 'superadmin',
          createdAt: new Date()
        }

        const insertResponse = await dbConnection.collection(process.env.ADMIN_COLLECTION).insertOne(superAdminInfo);
        if (insertResponse) {
          console.log('Admin inserted successfully')
        }else{
          console.log('Admin can not be inserted')

        }

      }
      return resolve(true);
    } catch (error) {
      return reject(error)
    }
  })
}