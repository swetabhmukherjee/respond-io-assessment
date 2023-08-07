const winston = require('winston');

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug', 
      format: winston.format.combine(
        winston.format.colorize({ all: true }), 
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: 'info', 
      filename: 'logs/app.log', 
      maxsize: 5242880, 
      maxFiles: 5, 
      format: winston.format.json(), 
    }),
  ],
});

winston.addColors(logColors);

module.exports = logger;
