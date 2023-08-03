const winston = require('winston');

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define log colors (optional, can be used to add colors to log levels)
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Initialize and configure the Winston logger
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
      level: 'debug', // Set the minimum log level to output to the console
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // Add colors to console output (optional)
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: 'info', // Set the minimum log level to output to the file
      filename: 'logs/app.log', // File path where logs will be saved
      maxsize: 5242880, // Max size of the log file (5MB)
      maxFiles: 5, // Number of log files to keep (rotate files)
      format: winston.format.json(), // Format the log as JSON
    }),
  ],
});

// Set custom colors for log levels (optional, if logColors object is defined)
winston.addColors(logColors);

module.exports = logger;
