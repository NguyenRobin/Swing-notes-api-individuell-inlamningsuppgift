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

async function insertNewUserAccountToDatabase(newUser) {
  return await userDatabase.insert(newUser);
}

async function findUserByID(id) {
  return await userDatabase.findOne({ user_id: id });
}

async function findAllUsers() {
  return await userDatabase.find({});
}
module.exports = {
  findUserAccount,
  insertNewUserAccountToDatabase,
  findUserByID,
  findAllUsers,
};
