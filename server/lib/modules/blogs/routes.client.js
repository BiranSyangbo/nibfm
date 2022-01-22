const express = require('express');
const router = express.Router();

const getBlogListController = require('./controllers/get_blog_list.client');
const getBlogDetailController = require('./controllers/get_blog_detail.client');


router.route('/')
  .get(getBlogListController)

router.route('/:slug')
  .get(getBlogDetailController);




module.exports = router;