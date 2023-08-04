const express = require('express');
const router = express.Router();

// Import all route handlers
const userRoutes = require('./user.routes');

// Use the route handlers with their respective prefixes
router.use('/user', userRoutes);

module.exports = router;
