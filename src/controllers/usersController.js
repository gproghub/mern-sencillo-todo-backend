const asyncHandler = require('express-async-handler');
const userModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

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
    res.status(400).json({ message: 'User already exists' });
  }

  //Hash the password before creating a user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  //Send user data in the response
  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  });
});

//@desc   Login user
//@route  POST /api/v1/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Please provide email and password' });
  }

  //Check user
  const registeredUser = await userModel.findOne({ email });
  if (registeredUser) {
    //Check password
    const doesPasswordMatch = await bcrypt.compare(
      password,
      registeredUser.password
    );
    if (doesPasswordMatch) {
      res.status(200).json({
        _id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
        token: generateToken(registeredUser._id),
      });
    } else {
      res.status(400).json({ message: 'Password does not match' });
    }
  } else {
    res.status(400).json({ message: 'User does not exist, please register.' });
  }
});

module.exports = { registerUser, loginUser };
