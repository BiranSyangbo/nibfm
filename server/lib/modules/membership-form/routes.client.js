const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user_token_auth.middleware');

const submitGeneralMembershipFromController = require('./controllers/submit_general_form.cleint');
const submitCorporateMembershipFromController = require('./controllers/submit_corporate_form.cleint');
const getGeneralMembershipFromController = require('./controllers/get_user_general_form_info.client');
const getCorporateMembershipFromController = require('./controllers/get_user_corporate_form_info.client');


router.route('/general')
  .post(submitGeneralMembershipFromController)

router.route('/general-form-info')
  .get(authMiddleware, getGeneralMembershipFromController)


router.route('/corporate')
  .post(submitCorporateMembershipFromController)


router.route('/corporate-form-info')
  .post(authMiddleware, getCorporateMembershipFromController)

module.exports = router;
