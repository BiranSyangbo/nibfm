var jwt = require('jsonwebtoken');

const generateJWTToken = (userInfo) => {
  try {
    return jwt.sign({
      user: userInfo._id,
      role: userInfo.role
    },
      process.env.TOKEN_SECRET,
      {
        algorithm: process.env.JWT_HASH_ALGORITHM,
        issuer: process.env.JWT_ISSUER,
        expiresIn: '24h'
      }
    )
  } catch (error) {
    throw error;
  }
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw error;
  }
}


const decodeJWTToken = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    throw error;
  }
}


module.exports = {
  generateJWTToken,
  verifyToken,
  decodeJWTToken
}