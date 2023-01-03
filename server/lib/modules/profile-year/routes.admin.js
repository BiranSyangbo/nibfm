const express = require('express');
const router = express.Router();

const getProfileInfo = require('./controllers/get-profile-year-detail-admin');
const updateProfile = require('./controllers/udpate-profile-year-admin');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/modify')
  .put(authMiddleware, updateProfile)

router.route('/get-info')
  .get(authMiddleware, getProfileInfo)

module.exports = router;