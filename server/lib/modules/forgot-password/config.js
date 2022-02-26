(() => {
  module.exports = {
    message: {
      userNotFound: "User not found",
      wentWront: "Something went wrong",
      emailSent: "A link to reset your password has been sent to your email address. Please follow the instructions in the email.",
      notAllowed: "User is not allowed to reset password.",
      linkNotFound: "Link not found",
      passwordNotMatch: "Password does not match",
      weakPassword: "Weak password provided",
      passwordNotProvided: "Password and confirm password required",
      passwordResetSuccess: "Password reset success",
      passwordResetFail: "Password reset fail"
    },
    tables: {
      customer_forgot_password : "customer_forgot_password"
    },
    config: {
      forgotPasswordTokenLength: 32,
      passwordStrengthRegex:/^(?=.*\d)(?=.*[a-z]).{6,}$/i,

  },
  }
})();