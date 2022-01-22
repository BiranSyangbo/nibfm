const express = require('express');
const router = express.Router();

const getAboutUsController = require('./controllers/get_about_us.admin');
const postAboutUsController = require('./controllers/update_about_us.admin');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .get(authMiddleware, getAboutUsController)
  .put(authMiddleware, postAboutUsController)


module.exports = router;