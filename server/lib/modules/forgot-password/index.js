(() => {
  module.exports = {
    requestForgotPassword: require('./controller/request_forgot_password.controller'),
    getLinkStatus: require('./controller/get_link_status.controller'),
    resetPassword: require('./controller/reset_password.controller')
  }
})();