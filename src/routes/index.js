const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const notesRouter = require('./notes.routes')


router.use('/user', userRoutes);
router.use('/notes', notesRouter);

module.exports = router;
