/* eslint-disable no-use-before-define */
import app from './app.js';
import http from 'http';
import logger from 'loglevel';

const isTest = process.env.NODE_ENV === 'test';
const logLevel = isTest ? 'warn' : 'info';

logger.setLevel(logLevel);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  logger.info(`Server is listening on port: ${port}`);
}
