const express = require('express');
const app = express();

const adminAuthRouter = require('./lib/modules/admin_auth/route');
app.use('/auth', adminAuthRouter);

app.use('/health-check', (req, res, next) => {
  res.status(200);
  return res.json({
    status: 200,
    msg: "Admin routes is ok"
  })
})

module.exports = app;


