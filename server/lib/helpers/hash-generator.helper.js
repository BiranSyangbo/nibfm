

const crypto = require('crypto');

const generateRandomBytes = (length) => {
  try {
    return crypto.randomBytes(length).toString("hex");
  } catch (error) {
    throw error;
  }
};


module.exports = {

    generateRandomBytes
}