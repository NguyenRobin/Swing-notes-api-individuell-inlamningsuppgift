const createID = require('../utils/uuid');
const { hashPassword, comparePassword } = require('../bcryptjs/bcrypt');
const {
  insertNewUserAccountToDatabase,
  findUserAccount,
  findAllUsers,
} = require('../model/user');
const { signNewToken } = require('../jsonwebtoken/jwt');
const { findUserNotes } = require('../model/note');

// create new user account
async function signUpNewUser(request, response) {
  try {
    const { username, email, password } = request.body;
    const user_id = createID();
    const hashedPassword = await hashPassword(password);
    if (username && email && password) {
      insertNewUserAccountToDatabase({
        username,
        email,
        hashedPassword,
        user_id,
      });
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
          user_id: userAccountExist.user_id,
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

async function getUserNotes(request, response) {
  const { id } = request.params;
  try {
    const userNotes = await findUserNotes(id);
    response.status(200).json({
      status: true,
      result: userNotes.length > 0 ? userNotes : 'You have no notes',
    });
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}

async function getAllUsers(request, response) {
  const users = await findAllUsers();
  try {
    if (users.length > 0) {
      const userInfo = users.map((user) => {
        return {
          username: user.username,
          email: user.email,
          user_id: user.user_id,
        };
      });
      response.status(200).json({
        status: true,
        result: userInfo ? userInfo : 'No users in the database',
      });
    }
  } catch (error) {
    response.status(500).json({
      status: false,
      error: 'Something went wrong on the server. Please try again!',
    });
  }
}
module.exports = { signUpNewUser, loginUser, getUserNotes, getAllUsers };
