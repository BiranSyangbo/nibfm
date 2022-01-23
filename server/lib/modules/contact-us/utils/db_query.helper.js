const moduleConfig = require('../config');
const collectionName = moduleConfig.collectionName;
const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const insertObject = {
      _id: uuid.v4(),
      name: insertObj.name,
      email: insertObj.email,
      message: insertObj.message,
      deleted: false,
      createdAt: new Date()
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const deleteDocument = (req, tableId) => {
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

const getContactUsList = (req, queryOpts, pagerOpts) => {
  try {
    return req.db.collection(collectionName).find(queryOpts)
      .project({ _id: 1, name: 1, email: 1 })
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


const getContactUsDetail = (req, uuid, projection) => {
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
  deleteDocument,
  getContactUsList,
  getContactUsDetail,
  countTotalItems
}