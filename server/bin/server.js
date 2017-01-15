#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const express = app.exp;
// const handlers = app.handlers;
const debug = require('debug')('server:server');
const http = require('http');

let port = process.env.PORT;

/**
 * Normalize Port
 * @param {Number} val
 * @return {Number}
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param {error} error
 * @return {void}
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * @return {void}
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Create HTTP server.
 */

const server = http.createServer(express);

/**
 * listen on Sockets.
 */

require('../sockets').listen(server);

/**
 * Get port from environment and store in Express.
 */

port = normalizePort(port || '3000');
express.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, '127.0.0.1');
server.on('error', onError);
server.on('listening', onListening);
