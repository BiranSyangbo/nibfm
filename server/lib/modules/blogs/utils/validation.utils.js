const { validateEmail } = require('../../../helpers/utility.helper')

const insertValidation = reqBody => {
  try {
    if (!reqBody.title || reqBody.title.trim().length === 0) return { isValid: false, msg: "Blog title is required." };
    if (!reqBody.content || reqBody.content.trim().length === 0) return { isValid: false, msg: "Blog content is required." };
    if (!reqBody.slug || reqBody.slug.trim().length === 0) return { isValid: false, msg: "Blog slug is required." };

    return { isValid: true, msg: '' }
  } catch (error) {
    throw error;
  }
}


module.exports = {
  insertValidation
}