const { Note } = require("../models");
const {
  encryptPassword,
  comparePasswords,
  generateBearerToken,
  decryptToken,
} = require("../utils/general-utils");

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
    throw new Error(`Failed to fetch notes! ${error}`);
  }
};

module.exports = { createNote, getNotesByUser };
