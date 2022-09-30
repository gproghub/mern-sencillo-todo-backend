const express = require('express');
const todosRouter = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todosController');
const { privateRoute } = require('../middleware/authMiddleware');

todosRouter.get('/', privateRoute, getTodos);
todosRouter.post('/', privateRoute, createTodo);
todosRouter.patch('/:id', privateRoute, updateTodo);
todosRouter.delete('/:id', privateRoute, deleteTodo);

module.exports = todosRouter;
