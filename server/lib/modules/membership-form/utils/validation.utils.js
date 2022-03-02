const { validateEmail } = require('../../../helpers/utility.helper')
const moment = require('moment');
const moduleConfig = require('../config');

const validateGeneralForm = reqBody => {
  try {
    if (!reqBody.profileImage || reqBody.profileImage.trim().length === 0) return { isValid: false, msg: "Profile image is required." };
    if (!reqBody.date || reqBody.date.trim().length === 0) return { isValid: false, msg: "Date is required." };

    //@email validation
    if (!reqBody.personalInformation.email || reqBody.personalInformation.email.trim().length === 0) return { isValid: false, msg: "email is required." };
    if (!validateEmail(reqBody.personalInformation.email)) return { isValid: false, msg: "Valid email is required." };

    //@validate date of birth in bs
    if (reqBody.personalInformation.dateOfBirthBs && !moment(reqBody.personalInformation.dateOfBirthBs, 'YYY-MM-DD', true).isValid()) return { isValid: false, msg: "Invalid date of birth in BS provided." };

    //@validate date of birth in ad
    if (reqBody.personalInformation.dateOfBirthAd && !moment(reqBody.personalInformation.dateOfBirthAd, 'YYY-MM-DD', true).isValid()) return { isValid: false, msg: "Invalid date of birth in AD provided." };

    //@membership type validation
    if (!reqBody.membershipType || reqBody.membershipType.trim().length === 0) return { isValid: false, msg: "Membership type is required." };
    if (typeof reqBody.membershipType !== 'string') return { isValid: false, msg: "Invalid Membership type provided." };
    if (!moduleConfig.config.membershipType.includes(reqBody.membershipType)) return { isValid: false, msg: "Invalid Membership type provided." };

    //@membership period validation
    if (!reqBody.membershipPeriod || reqBody.membershipPeriod.trim().length === 0) return { isValid: false, msg: "Membership period is required." };
    if (typeof reqBody.membershipPeriod !== 'string') return { isValid: false, msg: "Invalid Membership period provided." };
    if (!moduleConfig.config.membershipPeriod.includes(reqBody.membershipPeriod)) return { isValid: false, msg: "Invalid Membership period provided." };


    //@gender validation
    if (!reqBody.personalInformation.gender || reqBody.personalInformation.gender.trim().length === 0) return { isValid: false, msg: "gender is required." };
    if (typeof reqBody.personalInformation.gender !== 'string') return { isValid: false, msg: "Invalid gender provided." };
    if (!moduleConfig.config.gender.includes(reqBody.personalInformation.gender)) return { isValid: false, msg: "Invalid gender provided." };

    //@name validation
    if (!reqBody.personalInformation.name || reqBody.personalInformation.name.trim().length === 0) return { isValid: false, msg: "name is required." };
    if (typeof reqBody.personalInformation.name !== 'string') return { isValid: false, msg: "Invalid name provided." };

    return { isValid: true, msg: '' };
  } catch (error) {
    throw error;
  }
}

const validateCorporateForm = reqBody => {
  try {
    if (!reqBody.profileImage || reqBody.profileImage.trim().length === 0) return { isValid: false, msg: "Profile image is required." };
    if (!reqBody.date || reqBody.date.trim().length === 0) return { isValid: false, msg: "Date is required." };

    //@email validation
    if (!reqBody.organizationalInformation.email || reqBody.organizationalInformation.email.trim().length === 0) return { isValid: false, msg: "email is required." };
    if (!validateEmail(reqBody.organizationalInformation.email)) return { isValid: false, msg: "Invalid organization email provided." };

    //@enterpriseSizeType validation
    if (!reqBody.enterpriseSizeType || reqBody.enterpriseSizeType.trim().length === 0) return { isValid: false, msg: "Membership size type is required." };
    if (typeof reqBody.enterpriseSizeType !== 'string') return { isValid: false, msg: "Invalid Membership size type provided." };
    if (!moduleConfig.config.enterpriseSizeType.includes(reqBody.enterpriseSizeType)) return { isValid: false, msg: "Invalid Membership size type provided." };

    //@membership period validation
    if (!reqBody.membershipPeriod || reqBody.membershipPeriod.trim().length === 0) return { isValid: false, msg: "Membership period is required." };
    if (typeof reqBody.membershipPeriod !== 'string') return { isValid: false, msg: "Invalid Membership period provided." };
    if (!moduleConfig.config.membershipPeriod.includes(reqBody.membershipPeriod)) return { isValid: false, msg: "Invalid Membership period provided." };


    //@organization type validation
    if (!reqBody.organizationalInformation.organizationType || reqBody.organizationalInformation.organizationType.trim().length === 0) return { isValid: false, msg: "organizationType is required." };
    if (typeof reqBody.organizationalInformation.organizationType !== 'string') return { isValid: false, msg: "Invalid organizationType provided." };
    if (!moduleConfig.config.organizationType.includes(reqBody.organizationalInformation.organizationType)) return { isValid: false, msg: "Invalid organizationType provided." };

    //@organization name validation
    if (!reqBody.organizationalInformation.name || reqBody.organizationalInformation.name.trim().length === 0) return { isValid: false, msg: "organization name is required." };
    if (typeof reqBody.organizationalInformation.name !== 'string') return { isValid: false, msg: "Invalid organization name provided." };

    //@validate established date 
    if (reqBody.organizationalInformation.date && !moment(reqBody.organizationalInformation.date, 'YYY-MM-DD', true).isValid()) return { isValid: false, msg: "Invalid established date provided." };

    return { isValid: true, msg: '' };
  } catch (error) {
    throw error;
  }
}


module.exports = {
  validateGeneralForm,
  validateCorporateForm
}