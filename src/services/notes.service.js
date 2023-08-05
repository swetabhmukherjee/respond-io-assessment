const { Note } = require("../models");
const {
  encryptPassword,
  comparePasswords,
  generateBearerToken,
  decryptToken,
} = require("../utils/general-utils");
const logger = require("../utils/logger");

const createNote = async (noteContent, authToken) => {
  try {
    const performedBy = await decryptToken(authToken);

    await Note.create({
      user_id: performedBy.userId,
      note_content: noteContent,
      created_by: performedBy.userId,
      updated_by: performedBy.userId,
    });

    return "Note created successfully";
  } catch (error) {
    logger.error(`Failed to create note! ${error}`);
    throw new Error(`Failed to create note! ${error}`);
  }
};

const getNotesByUser = async (authToken) => {
  try {
    // Assuming you have added the user_id to the request object during authentication
    const userDetails = await decryptToken(authToken);
    if (!userDetails) {
      throw new Error("User does not exists!");
    }
    const notes = await Note.findAll({
      where: { user_id: userDetails.userId },
    });
    const result = notes.map((note) => {
      return { noteId: note.id, noteContent: note.note_content };
    });
    return result;
  } catch (error) {
    logger.error(`Failed to fetch notes! ${error}`);
    throw new Error(`Failed to fetch notes! ${error}`);
  }
};

const getNoteByNoteId = async (noteId, authToken) => {
  try {
    // Assuming you have added the user_id to the request object during authentication
    const userDetails = await decryptToken(authToken);
    if (!userDetails) {
      throw new Error("User does not exists!");
    }

    const note = await Note.findOne({
      where: { id: noteId, user_id: userDetails.userId },
    });

    if (!note) {
      throw new Error("Note not found");
    }
    return { noteId: note.id, noteContent: note.note_content };
  } catch (error) {
    logger.error(`Failed to fetch note! ${error}`);
    throw new Error(`Failed to fetch note! ${error}`);
  }
};

const updateNote = async (noteId, noteContent, authToken) => {
  try {
    const userDetails = await decryptToken(authToken);
    if (!userDetails) {
      throw new Error("User does not exists!");
    }
    const note = await Note.findOne({
      where: { id: noteId, user_id: userDetails.userId },
    });
    if (!note) {
      throw new Error("Note not found");
    }
    // Update the note content and save it to the database
    note.note_content = noteContent;
    await note.save();

    return "Note updated successfully";
  } catch (error) {
    logger.error(`Error upadting note! ${error}`);
    throw new Error(`Failed to update note! ${error}`);
  }
};

const deleteNote = async (noteId, authToken) => {
  try {
    const userDetails = await decryptToken(authToken);
    if (!userDetails) {
      throw new Error("User does not exists!");
    }
    const note = await Note.findOne({
      where: { id: noteId, user_id: userDetails.userId },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    // Delete the note from the database
    await note.destroy();

    return "Note deleted successfully";
  } catch (error) {
    logger.error(`Error deleting note! ${error}`);
    throw new Error(`Failed to delete note! ${error}`);
  }
};

module.exports = {
  createNote,
  getNotesByUser,
  getNoteByNoteId,
  updateNote,
  deleteNote,
};
