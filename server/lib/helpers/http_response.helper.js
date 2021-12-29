
const successResponse = (res, status, message, data) => {
  try {
    res.status(status);
    return res.json({
      status: status,
      message: message,
      data: data
    })
  } catch (error) {
    throw error;
  }
}

const failedResponse = (res, status, message) => {
  try {
    res.status(status);
    return res.json({
      status: status,
      message: message
    })
  } catch (error) {
    throw error;
  }
}

module.exports = {
  successResponse,
  failedResponse
}