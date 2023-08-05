const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

// User registration route
router.post('/', notesController.createNote);
router.get('/', notesController.getNotesByUser);

module.exports = router;
