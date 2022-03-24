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

const getList = (req, queryOpts, pagerOpts) => {
  try {
    return req.db.collection(collectionName).find(queryOpts)
      .project({
        uuid: 1,
        date: 1,
        donerName: 1,
        donerCountry: 1,
        amount: 1,
        createdAt: 1

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

const getDonationListForCustomer = (req) => {
  try {
    return req.db.collection(collectionName).aggregate([
      { $match: { deleted: false } },
      {
        $group: {
          _id: {
            year: { $year: "$date" }, month: { $month: "$date" }
          },
          list: {
            $push: { date: "$date", donerName: "$donerName", donerCountry: "$donerCountry", amount: "$amount" }
          }
        }
      },
      {
        $match: {
          "_id.year": new Date().getFullYear()
        }
      },
      {
        $sort: { "_id.month": 1 }
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