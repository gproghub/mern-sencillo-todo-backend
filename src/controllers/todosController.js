const asyncHandler = require('express-async-handler');
const todoModel = require('../models/todoModel');

//@desc   Get to-dos
//@route  GET /api/v1/todos
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  //asyncHandler is a built-in replacement for try-catch blocks
  const todos = await todoModel.find({});
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
  const todo = await todoModel.create(req.body);
  res.status(200).json({ todo });
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
  const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: 'To-do deleted', deletedTodo });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
