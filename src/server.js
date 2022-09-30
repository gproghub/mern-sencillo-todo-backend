const express = require('express');
require('dotenv').config();
// Routes
const todosRouter = require('./routes/todosRoutes');
const usersRouter = require('./routes/usersRoutes');
//connectDB
const connectDB = require('./db/db');

//This if-else statament allows us to use multiple threads and avoid blocking code.
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length; //To know the number of CPUs we have
if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  //Create worker threads
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid}`);
    console.log(`Let fork another worker`);
    cluster.fork();
  });
} else {
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
}
