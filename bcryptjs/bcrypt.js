const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const passwordIsMatching = await bcrypt.compare(password, hashedPassword);
  return passwordIsMatching;
}

module.exports = { hashPassword, comparePassword };
