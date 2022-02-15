const moduleConfig = require('../config');
const collectionName = moduleConfig.collectionName;
const uuid = require('uuid');

const update = (req, data,tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          title: data.title,
          slug : data.slug,
          description : data.description,
          image : data.image,
          isActive : data.isActive,
          metaTags : data.metaTags
        }
      })
  } catch (error) {
    throw error;
  }
}

const getDetails = (req, projection) => {
  try {
    return req.db.collection(collectionName).findOne(
      {
        deleted: false
      },
      {
        projection: projection
      }
    )
  } catch (error) {
    throw error;
  }
}
const getDetailsInfo = (req, slug, projection) => {
  try {
    return req.db.collection(collectionName).findOne(
      {
        slug: slug,
        deleted: false
      },
      {
        projection: projection
      }
    )
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDetails,
  update,
  getDetailsInfo
}