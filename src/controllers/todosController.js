const asyncHandler = require('express-async-handler');
const todoModel = require('../models/todoModel');
const userModel = require('../models/usersModel');

//@desc   Get to-dos
//@route  GET /api/v1/todos
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  //asyncHandler is a built-in replacement for try-catch blocks
  const todos = await todoModel.find({ user: req.user.id });
  res.status(200).json({ todos });
});

//@desc   Create to-do
//@route  POST /api/v1/todos
//@access Private
const createTodo = asyncHandler(async (req, res) => {
  //Check for body
  if (!req.body.text) {
    res.status(400).json({ message: 'Please add text' });
  }
  const newTodo = await todoModel.create({
    user: req.user,
    text: req.body.text,
  });

  res.status(200).json({ newTodo });
});

//@desc   Update to-do
//@route  PATCH /api/v1/todos/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
  //Check for existing todo
  const existingTodo = await todoModel.findById(req.params.id);
  if (!existingTodo) {
    res
      .status(400)
      .json({ message: `To-do with id ${req.params.id} does not exist` });
  }

  if (!req.user) {
    res.status(401).json({ message: 'User does not exist' });
  }

  if (existingTodo.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
  }

  const updatedTodo = await todoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ updatedTodo });
});

//@desc   Delete to-do
//@route  DELETE /api/v1/todos/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const existingTodo = await todoModel.findById(req.params.id);
  if (!existingTodo) {
    res
      .status(400)
      .json({ message: `To-do with id ${req.params.id} does not exist` });
  }

  if (!req.user) {
    res.status(401).json({ message: 'User does not exist' });
  }

  if (existingTodo.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
  }

  const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: 'To-do deleted', deletedTodo });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
