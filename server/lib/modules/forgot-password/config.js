/** @format */

(() => {
    module.exports = {
        message: {
            userNotFound: "We're sorry, but user is not found on the system.",
            wentWront: "We're sorry, but something went wrong",
            emailSent:
                'A link to reset your password has been sent to your email address. Please follow the instructions in the email.',
            notAllowed: "We're sorry, but user is not allowed to reset password.",
            linkNotFound: "We're sorry, but link not found",
            passwordNotMatch: "We're sorry, but password does not match",
            weakPassword: "We're sorry, but weak password provided",
            passwordNotProvided: "We're sorry, but password and confirm password required",
            passwordResetSuccess: "Password Changed Sucessfully, Please relogin to the system.",
            passwordResetFail: "We're sorry, but password reset fail",
        },
        tables: {
            customer_forgot_password: 'customer_forgot_password',
        },
        config: {
            forgotPasswordTokenLength: 32,
            passwordStrengthRegex: /^(?=.*\d)(?=.*[a-z]).{6,}$/i,
        },
    };
})();
