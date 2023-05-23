const { Router } = require('express');
const router = Router();
const {
  validateSignUpBodyRequest,
  validateUsernameOrEmail,
  validateLoginBodyRequest,
  validateUserParams,
} = require('../middleware/user');
const {
  signUpNewUser,
  loginUser,
  getUserNotes,
  getAllUsers,
} = require('../controller/user');
const { verifyToken } = require('../jsonwebtoken/jwt');

router.post(
  '/signup',
  validateSignUpBodyRequest,
  validateUsernameOrEmail,
  signUpNewUser
);
router.post('/login', validateLoginBodyRequest, loginUser);

router.get('/notes/:id', validateUserParams, verifyToken, getUserNotes);
router.get('/all', verifyToken, getAllUsers);

module.exports = router;
