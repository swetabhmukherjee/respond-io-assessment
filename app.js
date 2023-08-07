const express = require('express');
const app = express();
const logger = require('./src/utils/logger');
const routes = require('./src/routes')
const sequelize = require('./src/config/db.config');

sequelize.authenticate()
app.use(express.json())
app.use('/api', routes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
