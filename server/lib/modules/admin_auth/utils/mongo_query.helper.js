const getUserInfoByUsername = async (req, username) => {
  try {
    return Promise.resolve({
      id: "78689a48-722c-11ec-b80c-0bdaf5c898b2",
      username: "username",
      password: "password"
    })
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserInfoByUsername
}