const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add todo text'],
    },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;