(() => {
  module.exports = {
    login: require('./controller/login.controller'),
    logout: require('./controller/logout.controller'),
    getMyProfile: require('./controller/get_my_profile.controller')
  }
})();