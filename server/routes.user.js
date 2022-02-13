const express = require('express');
const app = express();

const adminAuthRouter = require('./lib/modules/admin_auth/route');
app.use('/auth', adminAuthRouter);

const aboutUsRouter = require('./lib/modules/about-us/routes.user');
app.use('/about-us', aboutUsRouter);

const blogRouter = require('./lib/modules/blogs/routes.client');
app.use('/blog', blogRouter);

const contactUsRouter = require('./lib/modules/contact-us/routes.client');
app.use('/contact-us', contactUsRouter);

const membershipFormRouter = require('./lib/modules/membership-form/routes.client');
app.use('/membership-form', membershipFormRouter);

app.use('/health-check', (req, res, next) => {
  res.status(200);
  return res.json({
    status: 200,
    msg: "User route is okay"
  })
})

module.exports = app;


