const mongodbHelper = require('../helpers/mongodb.helper')

const { aboutUsInfo } = require('../configs/app.config');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {

      const dbConnection = await mongodbHelper();

      const checkaboutUsInfoExists = await dbConnection.collection(aboutUsInfo.collectionName).findOne({
        deleted: false,
        _id: aboutUsInfo.insertObj._id
      });
      if (!checkaboutUsInfoExists || Object.keys(checkaboutUsInfoExists).length < 1) {


        const insertResponse = await dbConnection.collection(aboutUsInfo.collectionName).insertOne(aboutUsInfo.insertObj);
        if (insertResponse) {
          console.log('about us  information inserted successfully.')
        } else {
          console.log('about us can not be inserted.')
        }
      }
      return resolve(true);
    } catch (error) {
      return reject(error)
    }
  })
}