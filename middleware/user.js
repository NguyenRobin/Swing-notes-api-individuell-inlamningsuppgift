const { findUserAccount, findUserByID } = require('../model/user');

// create new user account
async function validateSignUpBodyRequest(request, response, next) {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    return response.status(400).json({
      status: false,
      message:
        " 'username', 'email' & 'password', is required. please try again",
    });
  }
  if (username && !email.includes('@') && password) {
    return response.status(400).json({
      status: false,
      message: 'Please enter a valid Email',
    });
  } else {
    next();
  }
}

async function validateUsernameOrEmail(request, response, next) {
  const { username, email } = request.body;
  const accountExist = await findUserAccount(username, email);
  if (accountExist) {
    response.status(409).json({
      status: false,
      message: `${
        username === accountExist.username ? 'Username' : 'Email'
      } already exist.`,
    });
  } else {
    next();
  }
}

// login
function validateLoginBodyRequest(request, response, next) {
  const { username, email, password } = request.body;
  if ((username && password) || (email && password)) {
    next();
  } else {
    response.status(400).json({
      status: false,
      message:
        "Properties: 'username' or 'email' and 'password' are required. ",
    });
  }
}

async function validateUserParams(request, response, next) {
  const { id } = request.params;
  const userExists = await findUserByID(id);
  if (userExists) {
    next();
  } else {
    response
      .status(404)
      .json({ status: false, message: 'No matching user ID found!' });
  }
}

module.exports = {
  validateSignUpBodyRequest,
  validateUsernameOrEmail,
  validateLoginBodyRequest,
  validateUserParams,
};
