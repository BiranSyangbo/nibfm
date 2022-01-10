const mongodbHelper = require('../helpers/mongodb.helper')


module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {

      const dbConnection = await mongodbHelper();
      const checkSuperadminExistsOrNot = await dbConnection.collection(process.env.ADMIN_COLLECTION).findOne({
        deleted: false,
        username: process.env.SUPER_ADMIN_USERNAME
      });
      if (!checkSuperadminExistsOrNot || Object.keys(checkSuperadminExistsOrNot).length < 1) {
        console.log('superadmin does not exist')
      }
      return resolve(true);
    } catch (error) {
      return reject(error)
    }
  })
}