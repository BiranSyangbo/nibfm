const getUserInfoByUsername = async (req, username) => {
  try {
    return req.db.collection(process.env.ADMIN_COLLECTION).findOne({
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
  getUserInfoByUsername,
  insertLoginInfo,
  getUserLoginInfo,
  deleteUserLoginInfo
}