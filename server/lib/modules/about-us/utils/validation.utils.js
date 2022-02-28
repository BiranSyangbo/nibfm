const { validateEmail } = require('../../../helpers/utility.helper')

const insertValidation = reqBody => {
  try {
    if (!reqBody.title || reqBody.title.trim().length === 0) return { isValid: false, msg: "title is required." };
    if (!reqBody.slug || reqBody.content.trim().length === 0) return { isValid: false, msg: "content is required." };

    return { isValid: true, msg: '' }
  } catch (error) {
    throw error;
  }
}


module.exports = {
  insertValidation
}