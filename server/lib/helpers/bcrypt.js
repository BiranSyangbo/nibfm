

const bcrypt = require('bcrypt');


const generateHashPassword = (plainPassword, salt) => {
  try {
    return bcrypt.hash(plainPassword, salt)
  } catch (error) {
    throw error;
  }
};


const generateSalt = () => {
  try {
    return bcrypt.genSalt(10)
  } catch (error) {
    throw error
  }
};


const verifyPassword = (plainPassword, hashPassword) => {
  try {
    return bcrypt.compare(plainPassword, hashPassword)
  } catch (error) {
    throw error;
  }
};




module.exports = {
  generateSalt,
  generateHashPassword,
  verifyPassword
}