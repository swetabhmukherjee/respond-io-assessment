const express = require('express');
const app = express();
const logger = require('./src/utils/logger');

// Import the Sequelize instance from dbConfig.js
const sequelize = require('./src/config/db.config');

// Test the database connection
sequelize.authenticate()
// Your other application code here...

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
