const { findUserAccount } = require('../model/user');

// create new user account
async function validateSignUpBodyRequest(request, response, next) {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(500).json({
      status: false,
      message:
        "'username', 'email' & 'password', is required. please try again",
    });
  } else {
    next();
  }
}

async function validateUsernameOrEmail(request, response, next) {
  const { username, email } = request.body;
  const accountExist = await findUserAccount(username, email);
  if (accountExist) {
    response.status(200).json({
      status: false,
      message: `${
        username === accountExist.username ? 'username' : 'email'
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
    response.status(500).json({
      status: false,
      message:
        "Properties: 'username' or 'email' and 'password' are required. ",
    });
  }
}

module.exports = {
  validateSignUpBodyRequest,
  validateUsernameOrEmail,
  validateLoginBodyRequest,
};
