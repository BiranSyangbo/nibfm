const express = require('express');
const router = express.Router();
const ctl = require('.');
const authMiddleware = require('../../middleware/user_token_auth.middleware');

router.route('/login').post(ctl.login)
router.route('/logout').put(authMiddleware, ctl.logout)
router.route('/my-profile').get(authMiddleware, ctl.getMyProfile)

module.exports = router;