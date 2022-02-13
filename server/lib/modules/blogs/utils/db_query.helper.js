const moduleConfig = require('../config');
const collectionName = moduleConfig.collectionName;
const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const insertObject = {
      uuid: uuid.v4(),
      title: insertObj.title,
      author: insertObj.author,
      content: insertObj.content,
      publishedDate : new Date(insertObj.publishedDate),
      images : insertObj.image,
      isActive : insertObj.isActive,
      metaTags: insertObj.metaTags,
      deleted: false,
      createdAt: new Date()
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const deleteBlog = (req, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          deleted: true
        }
      })
  } catch (error) {
    throw error;
  }
}

const getList = (req, queryOpts, pagerOpts) => {
  try {
    return req.db.collection(collectionName).find(queryOpts)
      .project({ uuid: 1, 
                title: 1, 
                author: 1,
                content : 1,
                publishedDate : 1,
                images : 1,
                isActive: 1,
                metaTags: 1
              })
      .skip(pagerOpts.offset)
      .limit(pagerOpts.perPage)
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    throw error;
  }
}

const countTotalItems = (req, queryOpts) => {
  try {
    return req.db.collection(collectionName).count(queryOpts);
  } catch (error) {
    throw error;
  }
}


const getDetails = (req, uuid, projection) => {
  try {
    return req.db.collection(collectionName).findOne(
      {
        _id: uuid,
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
  insert,
  deleteBlog,
  getList,
  getDetails,
  countTotalItems
}