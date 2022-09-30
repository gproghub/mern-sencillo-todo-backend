const express = require('express');
const todosRouter = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todosController');

todosRouter.get('/', getTodos);
todosRouter.post('/', createTodo);
todosRouter.patch('/:id', updateTodo);
todosRouter.delete('/:id', deleteTodo);

module.exports = todosRouter;
