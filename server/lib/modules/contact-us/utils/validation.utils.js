const { validateEmail } = require('../../../helpers/utility.helper')

const insertValidation = reqBody => {
  try {
    if (!reqBody.name || reqBody.name.trim().length === 0) return { isValid: false, msg: "Name is required." };
    if (!reqBody.email || reqBody.email.trim().length === 0) return { isValid: false, msg: "Email is required." };

    if (reqBody.email && !validateEmail(reqBody.email)) return { isValid: false, msg: "Invalid email provided." };
    if (!reqBody.message || reqBody.message.trim().length === 0) return { isValid: false, msg: "Message is required." };
    
    return { isValid: true, msg: '' }
  } catch (error) {
    throw error;
  }
}


module.exports = {
  insertValidation
}