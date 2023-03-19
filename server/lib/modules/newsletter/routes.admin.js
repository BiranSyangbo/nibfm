const express = require('express');
const router = express.Router();

const getNewsletterList = require('./controllers/get_request_list.admin');
const deleteNewsletter = require('./controllers/delete_request.admin');


const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .get(authMiddleware, getNewsletterList)

router.route('/:email')
  .delete(authMiddleware, deleteNewsletter)




module.exports = router;