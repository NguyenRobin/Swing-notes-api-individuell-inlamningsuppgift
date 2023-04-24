const { Router } = require('express');
const router = Router();
const {
  validateSignUpBodyRequest,
  validateUsernameOrEmail,
  validateLoginBodyRequest,
} = require('../middleware/user');
const { signUpNewUser, loginUser } = require('../controller/user');

router.post(
  '/signup',
  validateSignUpBodyRequest,
  validateUsernameOrEmail,
  signUpNewUser
);

router.post('/login', validateLoginBodyRequest, loginUser);

module.exports = router;
