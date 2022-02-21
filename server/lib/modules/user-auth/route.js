const express = require('express');
const router = express.Router();
const ctl = require('.');
const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/login').post(ctl.login)
router.route('/logout').put(authMiddleware, ctl.logout)

module.exports = router;