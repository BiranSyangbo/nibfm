const moduleConfig = require('../config');
const collectionName = moduleConfig.tables.customer_forgot_password;
const uuid = require('uuid');


const insert = (req,userId,token) => {
  try {
    let dt = new Date();
    dt.setMinutes(dt.getMinutes() + parseInt(process.env.PWD_RESET_LINK_EXPIRY_TIME));

    const insertObject = {
      uuid: uuid.v4(),
      userId: userId,
      token: token,
      expiry_time: dt.getTime(),
      used : false,
      deleted : false,
      created_at: Date.now()
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const getUserTokenInfoByUsername = async (req, username) => {
  try {
    return req.db.collection(collectionName).findOne({
      deleted: false,
      email: username
    });
  } catch (error) {
    throw error;
  }
}
const getUserPreviousRequest= async (req,userId) => {
  try {

    let projection = {
      userId: userId,
      expiry_time: {
        gte: new Date().getTime()
    }}

    return req.db.collection(collectionName).findOne({
      used : false,
      deleted : false,
      userId: userId
    },
    {
      projection: projection
    });
  } catch (error) {
    throw error;
  }
}
const getTokenDetailInfo= async (req,token) => {
  try {

    let projection = {
      userId: 1,
      expiry_time: 1,
      used : 1,
      uuid : 1
    }

    return req.db.collection(collectionName).findOne({
      deleted : false,
      token: token
    },
    {
      projection: projection
    });
  } catch (error) {
    throw error;
  }
}
const getForgotPassTokenDetailInfo= async (req,token) => {
  try {

    let projection = {
      userId: 1,
      expiry_time: 1,
      used : 1,
      token : 1
    }

    return req.db.collection(collectionName).findOne({
      deleted : false,
      uuid: token
    },
    {
      projection: projection
    });
  } catch (error) {
    throw error;
  }
}

const deletePreviousRecord = async (req, userId) => {
  try {
    return req.db.collection(collectionName).updateMany({
      userId: userId
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
const updateTokenStatus = async (req, userId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      userId: userId
    },
      {
        $set: {
          used: true
        }
      })
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insert,
  getUserTokenInfoByUsername,
  getUserPreviousRequest,
  deletePreviousRecord,
  updateTokenStatus,
  getTokenDetailInfo,
  getForgotPassTokenDetailInfo
}