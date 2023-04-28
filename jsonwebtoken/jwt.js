const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function signNewToken(userID) {
  const token = jwt.sign({ id: userID }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
}

function verifyToken(request, response, next) {
  try {
    const token = request.headers.authorization.replace('Bearer', '').trim('');
    const tokenIsValid = jwt.verify(token, process.env.SECRET_KEY);
    if (tokenIsValid) {
      next();
    }
  } catch (error) {
    response.status(401).json({
      status: false,
      error: 'Invalid token',
    });
  }
}
module.exports = { signNewToken, verifyToken };
