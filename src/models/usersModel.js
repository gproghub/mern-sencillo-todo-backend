const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true, //to ensure there are no duplicate emails.
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model('User', usersSchema);
module.exports = usersModel;
