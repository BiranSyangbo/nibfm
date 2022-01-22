const express = require('express');
const router = express.Router();

const getContactUsList = require('./controllers/get_request_list.admin');
const deleteContactUsList = require('./controllers/delete_request.admin');
const getContactUsDetail = require('./controllers/get_request.detail');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .get(authMiddleware, getContactUsList)

router.route('/:uuid')
  .patch(authMiddleware, deleteContactUsList)
  .get(authMiddleware, getContactUsDetail);




module.exports = router;