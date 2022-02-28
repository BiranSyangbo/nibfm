'use strict';

const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const port = process.env.PORT || 4001;


app.set('portNumber', port);

server.listen(port, () => {
  console.log('Node server started on  ' + port + ' at ' + Date(new Date()) + ' with process id', process.pid);
});

process.on('SIGTERM', () => {
  console.log("Closing server")
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
