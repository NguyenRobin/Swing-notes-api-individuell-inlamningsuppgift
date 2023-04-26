const Datastore = require('nedb-promises');

const noteDatabase = new Datastore({
  filename: './database/noteDatabase.db',
  autoload: true,
});

async function getNotes() {
  return await noteDatabase.find({});
}

async function findNote(requestedID) {
  return await noteDatabase.findOne({ id: requestedID });
}
async function findNoteTitle(requestQuery) {
  return await noteDatabase.find({ title: requestQuery });
}

async function insertNewNoteToDatabase(newNote) {
  return await noteDatabase.insert(newNote);
}

async function deleteNoteFromDatabase(requestedID) {
  return await noteDatabase.remove({ id: requestedID });
}

async function updateNoteInDatabase(
  requestedID,
  requestedTitle,
  requestText,
  modifiedAt
) {
  return await noteDatabase.update(
    { id: requestedID },
    {
      $set: {
        title: `${requestedTitle ? requestedTitle : requestedID.title}`,
        text: `${requestText ? requestText : requestedID.text} `,
        modifiedAt: modifiedAt,
      },
    },
    {}
  );
}

module.exports = {
  getNotes,
  insertNewNoteToDatabase,
  deleteNoteFromDatabase,
  findNote,
  updateNoteInDatabase,
  findNoteTitle,
};
