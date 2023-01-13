const express = require('express');
const router = express.Router();

const generalMembershipFromController = require('./controllers/get_general_forms_list.admin');
const corporateMembershipFromController = require('./controllers/get_corporate_forms_list.admin');
const UpdateStatusController = require('./controllers/update_status.admin');
const resyncProfileyear = require("./controllers/resync-profile-year.admin");
const deleteMembershipForm = require("./controllers/delete-membership-form.admin");

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/general')
  .get(authMiddleware, generalMembershipFromController)

router.route('/corporate')
  .get(authMiddleware, corporateMembershipFromController)

router.route('/update-status/:uuid')
  .post(authMiddleware, UpdateStatusController)

router.route('/resync/profile-year/:uuid')
  .put(authMiddleware, resyncProfileyear)

router.route("/info/delete/:uuid")
  .patch(authMiddleware, deleteMembershipForm)

module.exports = router;