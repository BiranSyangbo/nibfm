/** @format */

const express = require('express');
const router = express.Router();

const getEventListForClient = require('./controller/get_event_list.client');
const getEventDetailController = require('./controller/get_event_detail.client');
// const userTokenMiddleware = require('../../middleware/user_token_auth.middleware');

router.route('/info').get(getEventListForClient);

router.route('/:slug').get(getEventDetailController);
module.exports = router;
