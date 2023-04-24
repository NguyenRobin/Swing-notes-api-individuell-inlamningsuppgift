const createUserID = require('../utils/uuid');
const { hashPassword, comparePassword } = require('../bcryptjs/bcrypt');
const {
  insertNewUserAccountToDatabase,
  findUserAccount,
} = require('../model/user');
const { signNewToken } = require('../jsonwebtoken/jwt');

// create new user account
async function signUpNewUser(request, response) {
  const { username, email, password } = request.body;
  const id = createUserID();
  const hashedPassword = await hashPassword(password);
  if (username && email && password) {
    insertNewUserAccountToDatabase({ username, email, hashedPassword, id });
    response.status(200).json({
      status: true,
      message: 'User successfully created and added to database',
    });
  } else {
    response.status(400).json({
      status: false,
      message: 'User could not be created. Please try again.',
    });
  }
}

// login
async function loginUser(request, response) {
  const { username, email, password } = request.body;
  const userAccountExist = await findUserAccount(username, email);
  if (userAccountExist) {
    const passwordsIsMatching = await comparePassword(
      password,
      userAccountExist.hashedPassword
    );
    if (passwordsIsMatching) {
      const token = signNewToken(userAccountExist.id);
      const result = {
        status: true,
        username: userAccountExist.username,
        email: userAccountExist.email,
        token,
      };
      response.status(200).json(result);
    } else {
      return response
        .status(200)
        .json({ status: true, message: 'Invalid Password' });
    }
  } else {
    return response.status(401).json({
      status: false,
      message: 'User not able to login . Please try again later.',
    });
  }
}

module.exports = { signUpNewUser, loginUser };
