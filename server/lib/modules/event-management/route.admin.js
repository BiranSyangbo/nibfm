const express = require('express');
const router = express.Router();

const getEventListForAdmin = require('./controller/get_event_list.admin');
const createEvent = require('./controller/create_event.admin');
const updateEvent = require('./controller/update_event.admin');
const deleteEvent = require('./controller/delete_event.admin');
const getEventDetailInfo = require('./controller/get_event_detail.admin');
const adminAuthMiddleware = require('../../middleware/token_auth.middleware');


router.route('/')
  .get(adminAuthMiddleware, getEventListForAdmin)
  .post(adminAuthMiddleware, createEvent)


router.route('/info/:uuid')
  .get(adminAuthMiddleware, getEventDetailInfo)
  .put(adminAuthMiddleware, updateEvent)
  .patch(adminAuthMiddleware, deleteEvent)

  
module.exports = router;
