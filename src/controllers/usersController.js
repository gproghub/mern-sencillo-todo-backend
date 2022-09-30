const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register user' });
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: 'Login user' });
});

module.exports = { registerUser, loginUser };
