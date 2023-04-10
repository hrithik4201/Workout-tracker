const User = require('../models/userModel');
const config = require('../common/config');
const { signUpUserService , logInUserService} = require('../service/userService')
const validation = require('../common/validation')


// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    validation.validateLogInUserData(email,password);

    const user = await logInUserService(email,password);
    res.status(200).json( user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    validation.validateSignUpUserData(email,password);

    const user = await signUpUserService(email,password);

    res.status(200).json( user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
