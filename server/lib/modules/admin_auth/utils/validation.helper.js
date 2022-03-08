
const loginPayloadValidation = (body) => {
  try {
    if (!body.username || body.username.trim().length < 1) return { isValid: false, msg: "Username is required." };
    if (!body.password || body.password.trim().length < 1) return { isValid: false, msg: "Password is required." };
    return { isValid: true, msg: "" }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginPayloadValidation
}