'use strict';

const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const port = process.env.PORT || 4000; //port chnaged to 3005


app.set('portNumber', port);
server.listen(port, () => {
  console.log('Node server started on  ' + port + ' at ' + Date(new Date()));
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
