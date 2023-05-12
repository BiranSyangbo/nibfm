const express = require('express');
const app = express();

const adminAuthRouter = require('./lib/modules/admin_auth/routes');
app.use('/auth', adminAuthRouter);

const aboutUsRouter = require('./lib/modules/about-us/routes.user');
app.use('/about-us', aboutUsRouter);

const blogRouter = require('./lib/modules/blogs/routes.client');
app.use('/blog', blogRouter);

const contactUsRouter = require('./lib/modules/contact-us/routes.client');
app.use('/contact-us', contactUsRouter);

const membershipFormRouter = require('./lib/modules/membership-form/routes.client');
app.use('/membership-form', membershipFormRouter);

const userAuthRouter = require('./lib/modules/user-auth/routes');
app.use('/user-auth', userAuthRouter);

const forgotPasswordRouter = require('./lib/modules/forgot-password/routes');
app.use('/forgot-password', forgotPasswordRouter);

const fileManagementRouter = require('./lib/modules/file-management/routes.common');
app.use('/file-management', fileManagementRouter);

const donationManagementRouter = require('./lib/modules/donation-management/routes.client');
app.use('/donation-management', donationManagementRouter)

const eventManaagementRouter = require('./lib/modules/event-management/routes.client');
app.use('/event-management', eventManaagementRouter);

const newletterManagementRouter = require('./lib/modules/newsletter/routes.client');
app.use('/newsletter', newletterManagementRouter);

app.use('/health-check', (req, res, next) => {
  res.status(200);
  return res.json({
    status: 200,
    msg: "User route is okay"
  })
})

module.exports = app;
