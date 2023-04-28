const Datastore = require('nedb-promises');
const { title } = require('process');

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
  const search = requestQuery.toLowerCase().split(' ');
  const allNotes = await getNotes();
  for (const titles of allNotes) {
    const title = titles.title.toLowerCase();
    for (const word of search) {
      if (title.includes(word)) {
        // create a regex for each word, then make it insensitive to be able to find it in database
        const createRegex = new RegExp(word, 'i');
        return await noteDatabase.find({ title: createRegex });
      }
    }
  }
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
