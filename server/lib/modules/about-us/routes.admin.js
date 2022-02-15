const express = require('express');
const router = express.Router();

const getAboutUsController = require('./controllers/get_about_us.admin');
const postAboutUsController = require('./controllers/update_about_us.admin');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .get(getAboutUsController)
  .put(postAboutUsController)


module.exports = router;