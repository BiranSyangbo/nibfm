const express = require('express');
const router = express.Router();

const postNewsLetterRequest = require('./controllers/post_request.client');
const deleteNewsletter = require('./controllers/delete_request.client');

router.route('/')
  .post(postNewsLetterRequest)

router.route('/:id')
  .delete(deleteNewsletter)

module.exports = router;