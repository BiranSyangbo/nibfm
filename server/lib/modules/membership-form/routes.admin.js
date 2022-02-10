const express = require('express');
const router = express.Router();

const getMembershipFromListController = require('./controllers/get_forms_list.admin');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .get(authMiddleware, getMembershipFromListController)

module.exports = router;