const express = require('express');
const router = express.Router();

const getDonationListForAdmin = require('./controllers/get_donation_list.admin');
const createDonation = require('./controllers/create_donation.admin');
const updateDonation = require('./controllers/update_donation.admin');
const deleteDonation = require('./controllers/delete_donation.admin');
const getDonationDetailInfo = require('./controllers/get_donation.detail.admin');
const adminAuthMiddleware = require('../../middleware/token_auth.middleware');


router.route('/')
  .get(adminAuthMiddleware, getDonationListForAdmin)
  .post(adminAuthMiddleware, createDonation)


router.route('/info/:uuid')
  .get(adminAuthMiddleware, getDonationDetailInfo)
  .put(adminAuthMiddleware, updateDonation)
  .patch(adminAuthMiddleware, deleteDonation)

  
module.exports = router;
