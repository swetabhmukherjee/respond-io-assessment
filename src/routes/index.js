const express = require('express');
const router = express.Router();

// Import all route handlers
const userRoutes = require('./user.routes');
const notesRouter = require('./notes.routes')
// Use the route handlers with their respective prefixes

router.use('/user', userRoutes);
router.use('/notes', notesRouter);

module.exports = router;
