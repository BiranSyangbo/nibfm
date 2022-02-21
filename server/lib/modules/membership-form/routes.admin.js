const express = require('express');
const router = express.Router();

const generalMembershipFromController = require('./controllers/get_general_forms_list.admin');
const corporateMembershipFromController = require('./controllers/get_corporate_forms_list.admin');
const UpdateStatusController = require('./controllers/update_status.admin');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/general')
  .get(generalMembershipFromController)

router.route('/corporate')
  .get(corporateMembershipFromController)

router.route('/update-status/:uuid')
  .post(UpdateStatusController)

module.exports = router;