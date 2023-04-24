const { v4: uuidv4 } = require('uuid');

function createUserID() {
  return uuidv4();
}

module.exports = createUserID;
