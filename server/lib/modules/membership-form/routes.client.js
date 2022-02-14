const express = require('express');
const router = express.Router();

const submitGeneralMembershipFromController = require('./controllers/submit_general_form.cleint');
const submitCorporateMembershipFromController = require('./controllers/submit_corporate_form.cleint');


router.route('/general')
  .post(submitGeneralMembershipFromController)


router.route('/corporate')
  .post(submitCorporateMembershipFromController)

module.exports = router;
