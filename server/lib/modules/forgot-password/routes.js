const express = require('express');
const router = express.Router();
const ctl = require('.');

router.route('/').post(ctl.requestForgotPassword)
router.route('/status').get(ctl.getLinkStatus)
router.route('/reset').put(ctl.resetPassword)


module.exports = router;