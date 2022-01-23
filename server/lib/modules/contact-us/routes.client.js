const express = require('express');
const router = express.Router();

const postContactUsRequest = require('./controllers/post_request.client');


router.route('/')
  .post(postContactUsRequest)



module.exports = router;