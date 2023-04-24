const Datastore = require('nedb-promises');
const userDatabase = new Datastore({
  filename: './database/userDatabase.db',
  autoload: true,
});

async function findUserAccount(requestUsername, requestEmail) {
  return await userDatabase.findOne({
    $or: [{ username: requestUsername }, { email: requestEmail }],
  });
}

function insertNewUserAccountToDatabase(newUser) {
  return userDatabase.insert(newUser);
}

module.exports = { findUserAccount, insertNewUserAccountToDatabase };
