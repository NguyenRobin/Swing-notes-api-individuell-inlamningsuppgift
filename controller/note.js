const {
  getNotes,
  insertNewNoteToDatabase,
  deleteNoteFromDatabase,
  findNote,
  updateNoteInDatabase,
  findNoteTitle,
} = require('../model/note');
const createID = require('../utils/uuid');

async function getAllNotes(request, response) {
  try {
    const allNotes = await getNotes();
    if (allNotes.length > 0) {
      response.status(200).json({ status: true, notes: allNotes });
    } else {
      response
        .status(200)
        .json({ status: true, message: 'You have no current notes' });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

async function createNewNote(request, response) {
  try {
    const { title, text } = request.body;
    const id = createID();
    const createdAt = new Date().toLocaleDateString();
    if (title && text) {
      insertNewNoteToDatabase({ id, title, text, createdAt });
      response.status(200).json({
        status: true,
        message: 'New note successfully added to database',
      });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

async function deleteNote(request, response) {
  try {
    const { id } = request.params;
    const noteExist = await findNote(id);
    if (noteExist) {
      deleteNoteFromDatabase(id);
      response.status(200).json({
        status: true,
        message: `Note ID: ${noteExist.id} successfully deleted`,
      });
    } else {
      response.status(404).json({ status: false, message: `ID not found!` });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

async function updateNote(request, response) {
  try {
    const { title, text } = request.body;
    const { id } = request.params;
    const date = new Date().toLocaleDateString('se-SV');
    const time = new Date().toLocaleTimeString('se-SV');
    const modifiedAt = `${date} ${time}`;
    const note = await findNote(id);

    if (note) {
      updateNoteInDatabase(
        note.id,
        title || note.title,
        text || note.text,
        modifiedAt
      );
      response.status(200).json({
        status: true,
        message: `Note ID: ${id} has successfully been updated`,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

async function getTitle(request, response) {
  try {
    const { title } = request.query;
    const noteTitle = await findNoteTitle(title);
    if (noteTitle) {
      response.status(200).json({ status: true, title: noteTitle });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

module.exports = {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
  getTitle,
};
