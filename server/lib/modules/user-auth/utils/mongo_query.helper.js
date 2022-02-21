const moduleConfig = require('../config');
const collectionName = process.env.USERS_COLLECTION
const uuid = require('uuid');

const insert = (req,email, hashPassword) => {
  try {
    const insertObject = {
      uuid: uuid.v4(),
      password: hashPassword,
      email : email,
      type: 'user', //TODO
      status : true,
      deleted: false,
      createdAt: new Date()
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const getUserInfoByUsername = async (req, username) => {
  try {
    return req.db.collection(collectionName).findOne({
      deleted: false,
      email: username
    });
  } catch (error) {
    throw error;
  }
}

const insertLoginInfo = async (db, loginInfo) => {
  try {
    return db.collection('login-session').insertOne(loginInfo);
  } catch (error) {
    throw error;
  }
}

const getUserLoginInfo = async (req, userId) => {
  try {
    return req.db.collection('login-session').findOne({
      token: req.authToken,
      deleted: false,
      expiry_time: { $gte: Date.now() },
      user: userId
    })
  } catch (error) {
    throw error;
  }
}

const deleteUserLoginInfo = async (db, id) => {
  try {
    return db.collection('login-session').updateOne({
      _id: id
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

module.exports = {
  insert,
  getUserInfoByUsername,
  insertLoginInfo,
  getUserLoginInfo,
  deleteUserLoginInfo
}