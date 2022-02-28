const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user_token_auth.middleware');

const submitGeneralMembershipFromController = require('./controllers/submit_general_form.cleint');
const submitCorporateMembershipFromController = require('./controllers/submit_corporate_form.cleint');
const getGeneralMembershipFromController = require('./controllers/get_user_general_form_info.client');
const getCorporateMembershipFromController = require('./controllers/get_user_corporate_form_info.client');

const updateGeneralMembershipFromController = require('./controllers/update_general.client');
const updateCorporateMembershipFromController = require('./controllers/update_corporate.client');


router.route('/general')
  .post(submitGeneralMembershipFromController)

router.route('/general-form-info')
  .get(authMiddleware, getGeneralMembershipFromController)

router.route('/general-form-info/:uuid')
  .put(authMiddleware, updateGeneralMembershipFromController)


router.route('/corporate')
  .post(submitCorporateMembershipFromController)


router.route('/corporate-form-info')
  .post(authMiddleware, getCorporateMembershipFromController)

router.route('/corporate-form-info/:uuid')
  .put(authMiddleware, updateCorporateMembershipFromController)

module.exports = router;
