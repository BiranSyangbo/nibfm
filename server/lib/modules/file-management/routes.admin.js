const express = require('express');
const router = express.Router();

const uploadFile = require('./controllers/upload_file');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .post(authMiddleware, uploadFile);


module.exports = router;