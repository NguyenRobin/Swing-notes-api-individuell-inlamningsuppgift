const { v4: uuidv4 } = require('uuid');

function createID() {
  return uuidv4();
}

module.exports = createID;
