const moment = require('moment');
const numberRegex = new RegExp('^[0-9]*$');

module.exports = (reqBody) => {
  try {
    if (!reqBody.date || reqBody.date.trim().length === 0) return { isValid: false, msg: "Donation date is required." };
    if (reqBody.date && !moment(reqBody.date, 'YYY-MM-DD', true).isValid()) return { isValid: false, msg: "Invalid date provided." };
    if (!reqBody.donerName || reqBody.donerName.trim().length === 0) return { isValid: false, msg: "Doner name is required." };
    if (!reqBody.donerCountry || reqBody.donerCountry.trim().length === 0) return { isValid: false, msg: "Doner country is required." };
    if (!reqBody.amount) return { isValid: false, msg: "Donation amount is required." };
    if (numberRegex.test(parseInt(reqBody.amount)) == false) return { isValid: false, msg: "Invalid Donation amount." };

    return { isValid: true, msg: "" };
  } catch (error) {
    throw error;
  }
}