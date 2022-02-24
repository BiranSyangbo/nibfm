(() => {
  module.exports = {
    message: {
      loginSuccess: "Login success.",
      loginFail: "Login credential does not match.",
      logoutSuccess: "Logout success.",
      validation: {
        usernameRequired: "User name is required.",
        passwordRequired: "Password is required."
      }
    },
    tables: {
      login_session: "login_session"
    },
    config: {
      passwordStrengthRegex:/^(?=.*\d)(?=.*[a-z]).{6,}$/i,

  },
  }
})();