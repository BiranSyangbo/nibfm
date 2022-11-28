const { validateEmail } = require('../../../helpers/utility.helper')

const insertValidation = reqBody => {
  try {
    if (!reqBody.name || reqBody.name.trim().length === 0) return { isValid: false, msg: "User Name is required." };
    if (!reqBody.email || reqBody.email.trim().length === 0) return { isValid: false, msg: "user Email is required." };

    if (reqBody.email && !validateEmail(reqBody.email)) return { isValid: false, msg: "Invalid user email provided." };
    if (!reqBody.message || reqBody.message.trim().length === 0) return { isValid: false, msg: "user message or quires is required." };

    return { isValid: true, msg: '' }
  } catch (error) {
    throw error;
  }
}


module.exports = {
  insertValidation
}