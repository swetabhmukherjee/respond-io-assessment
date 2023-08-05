const notesService = require("../services/notes.service");
const logger = require("../utils/logger");
const { responseWrapper } = require("../utils/general-utils");

const getAllNotes = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const result = await notesService.getAllNotes(authToken);
    res.status(200).send(responseWrapper(200, result, null));
  } catch (error) {
    logger.error("Error fetching notes", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

const createNote = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const { noteContent } = req.body;
    const result = await notesService.createNote(noteContent, authToken);
    res.status(201).send(responseWrapper(201, result, null));
  } catch (error) {
    logger.error("Error creating note", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

const getNotesByUser = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const result = await notesService.getNotesByUser(authToken);
    res.status(200).send(responseWrapper(200, result, null));
  } catch (error) {
    logger.error("Error fetching notes", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

const getNoteByNoteId = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const { noteId } = req.params;
    const result = await notesService.getNoteByNoteId(noteId, authToken);
    res.status(200).send(responseWrapper(200, result, null));
  } catch (error) {
    logger.error("Error fetching note", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

const updateNote = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const { noteId } = req.params;
    const { noteContent } = req.body;
    const result = await notesService.updateNote(
      noteId,
      noteContent,
      authToken
    );
    res.status(200).send(responseWrapper(200, result, null));
  } catch (error) {
    logger.error("Error updating note", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

const deleteNote = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const { noteId } = req.params;
    const result = await notesService.deleteNote(noteId, authToken);
    res.status(200).send(responseWrapper(200, result, null));
  } catch (error) {
    logger.error("Error deleting note", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getNotesByUser,
  getNoteByNoteId,
  updateNote,
  deleteNote,
};
