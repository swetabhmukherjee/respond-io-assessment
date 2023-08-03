const Sequelize = require('sequelize');
const logger = require('../utils/logger');
require('dotenv').config(); // Load environment variables from .env file

const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const env = process.env.NODE_ENV || 'development';

// Use environment variables directly for database configuration
const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: 'mysql',
  logging: (log) => logger.info(log),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
