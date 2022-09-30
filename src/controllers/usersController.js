const asyncHandler = require('express-async-handler');
const userModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');

//@desc   Register user
//@route  POST /api/v1/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check request has all fields
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please provide all the fields' });
  }

  //Check if email already exists (by email)
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  //Hash the password before creating a user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const registeredUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  //Send user data in the response
  res.status(200).json({ registeredUser });
});

//@desc   Login user
//@route  POST /api/v1/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: 'Login user' });
});

module.exports = { registerUser, loginUser };
