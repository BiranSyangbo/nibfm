const express = require('express');
const router = express.Router();

const getDonationListForEndUser = require('./controllers/get_donation_list.client');
// const userTokenMiddleware = require('../../middleware/user_token_auth.middleware');


router.route('/list')
  .get(getDonationListForEndUser)

module.exports = router;
