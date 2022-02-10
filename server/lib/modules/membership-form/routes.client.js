const express = require('express');
const router = express.Router();

const submitMembershipFromController = require('./controllers/submit_form.cleint');

router.route('/submit')
  .get(submitMembershipFromController)

module.exports = router;