const jwt = require('jsonwebtoken');

function signNewToken(userID) {
  const token = jwt.sign({ id: userID }, 'secretKey', { expiresIn: '1h' });
  return token;
}
module.exports = { signNewToken };
