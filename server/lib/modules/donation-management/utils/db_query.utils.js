const collectionName = 'DonationManagement'
const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const insertObject = {
      _id: uuid.v4(),
      date: new Date(insertObj.date),
      donerName: insertObj.donerName,
      donerCountry: insertObj.donerCountry,
      amount: parseFloat(insertObj.amount),
      isAnonymous: insertObj.isAnonymous,
      currency: insertObj.currency,
      deleted: false,
      // active: true,
      createdAt: new Date(),
      createdBy: req.decoded.userId

    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const update = (req, insertObj, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          date: new Date(insertObj.date),
          donerName: insertObj.donerName,
          donerCountry: insertObj.donerCountry,
          amount: parseFloat(insertObj.amount),
          isAnonymous: insertObj.isAnonymous,
          currency: insertObj.currency,
          updatedAt: new Date(),
          updatedBy: req.decoded.userId
        }
      })
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
          deleted: true,
          deletedAt: new Date(),
          deletedBy: req.decoded.userId
        }
      })
  } catch (error) {
    throw error;
  }
}

const getList = (req, queryOpts) => {
  try {
    return req.db.collection(collectionName).find(queryOpts)
      .project({
        uuid: 1,
        date: 1,
        donerName: 1,
        donerCountry: 1,
        amount: 1,
        currency: 1,
        isAnonymous: 1,
        createdAt: 1

      })
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


const checkDonationExists = (req, uuid, projection) => {
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

const getDonationListForCustomer = (req, queryOpts, pagerOpts) => {
  try {
    return req.db.collection(collectionName).aggregate([
      { $sort: { createdAt: -1 } },
      { $match: queryOpts },
      {
        $project: {
          date: 1,
          donerName: {
            $cond: { if: { $eq: ["$isAnonymous", true] }, then: "", else: '$donerName' }
          },
          donerCountry: 1,
          amount: 1,
          currency: 1
        }
      },
      {
        $skip: pagerOpts.offset
      },
      {
        $limit: pagerOpts.perPage
      }
    ]).toArray()
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insert,
  deleteDocument,
  getList,
  checkDonationExists,
  countTotalItems,
  update,
  getDonationListForCustomer
}