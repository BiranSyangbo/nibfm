const mongodbHelper = require('../helpers/mongodb.helper')

const { officeInfo } = require('../configs/app.config');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {

      const dbConnection = await mongodbHelper();

      const checkOfficeInfoExists = await dbConnection.collection(officeInfo.collectionName).findOne({
        deleted: false,
        _id: officeInfo.insertObj._id
      });
      if (!checkOfficeInfoExists || Object.keys(checkOfficeInfoExists).length < 1) {


        const insertResponse = await dbConnection.collection(officeInfo.collectionName).insertOne(officeInfo.insertObj);
        if (insertResponse) {
          console.log('Office information inserted successfully.')
        } else {
          console.log('Office information can not be inserted.')
        }
      }
      return resolve(true);
    } catch (error) {
      return reject(error)
    }
  })
}