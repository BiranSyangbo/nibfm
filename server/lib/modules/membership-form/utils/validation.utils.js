const { validateEmail } = require('../../../helpers/utility.helper')

const insertValidation = reqBody => {
  try {
    if (!reqBody.profileImage || reqBody.profileImage.trim().length === 0) return { isValid: false, msg: "Profile image is required." };
    if (!reqBody.date || reqBody.date.trim().length === 0) return { isValid: false, msg: "Date is required." };

    // if (reqBody.email && !validateEmail(reqBody.email)) return { isValid: false, msg: "Valid email is required." };
    // if (!reqBody.membershipType || reqBody.membershipType.trim().length === 0) return { isValid: false, msg: "Membership type is required." };


    
    return { isValid: true, msg: '' }
  } catch (error) {
    throw error;
  }
}


module.exports = {
  insertValidation
}