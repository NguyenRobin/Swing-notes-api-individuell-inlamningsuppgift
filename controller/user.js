const createID = require('../utils/uuid');
const { hashPassword, comparePassword } = require('../bcryptjs/bcrypt');
const {
  insertNewUserAccountToDatabase,
  findUserAccount,
} = require('../model/user');
const { signNewToken } = require('../jsonwebtoken/jwt');

// create new user account
async function signUpNewUser(request, response) {
  try {
    const { username, email, password } = request.body;
    const id = createID();
    const hashedPassword = await hashPassword(password);
    if (username && email && password) {
      insertNewUserAccountToDatabase({ username, email, hashedPassword, id });
      response.status(201).json({
        status: true,
        message: 'User successfully created and added to database',
      });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

// login
async function loginUser(request, response) {
  try {
    const { username, email, password } = request.body;
    const userAccountExist = await findUserAccount(username, email);
    if (!userAccountExist) {
      response
        .status(404)
        .json({ status: false, message: 'User account does not exist' });
    }
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
          .status(401)
          .json({ status: false, message: 'Invalid Password' });
      }
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

module.exports = { signUpNewUser, loginUser };
