const express = require('express');
const app = express();

const adminAuthRouter = require('./lib/modules/admin_auth/route');
app.use('/auth', adminAuthRouter);

const aboutUsRouter = require('./lib/modules/about-us/routes.admin');
app.use('/about-us', aboutUsRouter);

const blogRouter = require('./lib/modules/blogs/routes.admin');
app.use('/blog', blogRouter);

const contactUsRouter = require('./lib/modules/contact-us/routes.admin');
app.use('/contact-us', contactUsRouter);

const fileManagementRouter = require('./lib/modules/file-management/routes.admin');
app.use('/file-management', fileManagementRouter)

const membershipFormRouter = require('./lib/modules/membership-form/routes.admin');
app.use('/membership-form', membershipFormRouter);

app.get('/health-check', (req, res, next) => {
  res.status(200);
  return res.json({
    status: 200,
    msg: "Admin routes is ok"
  })
})

module.exports = app;


