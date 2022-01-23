'use strict';
const express = require('express');
const path = require('path');
const app = express();
const helmet = require("helmet");

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const uuid = require('uuid')
const mongodbHelper = require('../server/lib/helpers/mongodb.helper')
require('dotenv').config({ path: path.join(__dirname, '.env') });
const defaultAdminMigrationHelper = require('./lib/data-migrations/default-admin.data');
const defaultOfficeMigrationHelper = require('./lib/data-migrations/default-office-info');

global.rootDir = __dirname;

try {

  app.use(helmet());

  app.use('/api/v1/user/static', express.static(path.join(__dirname, 'public')));

  
  app.use(cors())
  app.options('*', cors());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,x-access-token,Accept,Origin');
    res.setHeader('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');
    next();
  });

  defaultAdminMigrationHelper();
  defaultOfficeMigrationHelper();



  app.use(async (req, res, next) => {
    req.db = await mongodbHelper();
    req.debug = {
      ip: req.ip,
      debugId: uuid.v4(),
      userId: null
    }
    return next();
  });

  const swaggerDefinitions = require('./swagger.definitions');
  app.use('/index.html', swaggerUi.serve, swaggerUi.setup(swaggerDefinitions.server));

  const adminRouter = require('./routes.admin');
  const userRouter = require('./routes.user');

  app.set('rateLimit', 100);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/v1/admin', adminRouter);

  app.use('/api/v1/user', userRouter);

  app.use((err, req, res, next) => {
    res.status(500);
    return res.json({
      message: process.env.NODE_ENV === 'production' ? 'Someting went wrong.' : err.message
    });
  });

  app.use('/api/*', (req, res, next) => {
    return res.json({ message: 'Api route not found' })
  })

} catch (error) {
  console.log('error', error)
}


module.exports = app;
