const moment = require('moment');
const numberRegex = new RegExp('^[0-9]*$');

module.exports = (reqBody) => {
  try {
    if (!reqBody.title || reqBody.title.trim().length === 0) return { isValid: false, msg: "Event title is required." };
    if (!reqBody.slug || reqBody.slug.trim().length === 0) return { isValid: false, msg: "Event slug is required." };
    if (!reqBody.author || reqBody.author.trim().length === 0) return { isValid: false, msg: "Author name is required." };
    if (!reqBody.date || reqBody.date.trim().length === 0) return { isValid: false, msg: "Event date is required." };
    if (reqBody.date && !moment(reqBody.date, 'YYY-MM-DD', true).isValid()) return { isValid: false, msg: "Invalid date provided." };
    if (!reqBody.image || reqBody.image.trim().length === 0) return { isValid: false, msg: "Image is required." };
    if (!reqBody.meta) return { isValid: false, msg: "Meta data not provided." };
    if (!reqBody.meta.tag || reqBody.meta.tag.trim().length === 0) return { isValid: false, msg: "Meta tag not provided." };
    if (!reqBody.meta.keyword || reqBody.meta.keyword.trim().length === 0) return { isValid: false, msg: "Meta keyword not provided." };
    if (!reqBody.meta.description || reqBody.meta.description.trim().length === 0) return { isValid: false, msg: "Meta description not provided." };
    if (reqBody.status !== true && reqBody.status !== false) return { isValid: false, msg: "Invalid status provided." };

    return { isValid: true, msg: "" };
  } catch (error) {
    throw error;
  }
}