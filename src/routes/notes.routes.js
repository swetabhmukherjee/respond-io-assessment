const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

// User registration route
router.post('/', notesController.createNote);
router.get('/', notesController.getNotesByUser);
router.get('/:noteId', notesController.getNoteByNoteId);
router.put('/:noteId', notesController.updateNote);
router.delete('/:noteId', notesController.deleteNote);

module.exports = router;
