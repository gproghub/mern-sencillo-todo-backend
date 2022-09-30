const express = require('express');
require('dotenv').config();
// Routes
const todosRouter = require('./routes/todosRoutes');
const usersRouter = require('./routes/usersRoutes');
//connectDB
const connectDB = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3005;

//CHECK WHAT THIS DOES EXACTLY
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/todos', todosRouter);
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
