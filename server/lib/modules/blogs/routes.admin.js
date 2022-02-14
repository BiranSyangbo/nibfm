const express = require('express');
const router = express.Router();

const getBlogListController = require('./controllers/get_blog_list.admin');
const createBlogController = require('./controllers/create_blog.admin');
const updateBlogController = require('./controllers/update_blog.admin');
const deletBlogControlelr = require('./controllers/delete_blog.admin');
const getBlogDetailController = require('./controllers/get_blog_detail.admin');

const authMiddleware = require('../../middleware/token_auth.middleware');

router.route('/')
  .get(getBlogListController)
  .post(createBlogController);

router.route('/:uuid')
  .put(authMiddleware, updateBlogController)
  .patch(authMiddleware, deletBlogControlelr)
  .get(authMiddleware, getBlogDetailController);




module.exports = router;