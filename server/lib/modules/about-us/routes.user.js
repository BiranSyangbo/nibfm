const express = require('express');
const router = express.Router();

const aboutUsController = require('./controllers/get_about_us.client');

router.route('/info/:slug').get(aboutUsController)

module.exports = router;