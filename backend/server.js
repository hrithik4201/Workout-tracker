require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const plannerRoutes = require('./routes/planner');
const config = require('./common/config')
const cors = require('cors'); // import the cors middleware

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors()); // enable cors for all routes

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/planner', plannerRoutes);

// connect to db
mongoose.set('strictQuery', true);

mongoose
  .connect(config?.mongo?.host?.uri)
  .then(() => {
    // listen for requests
    app.listen(config.port, () => {
      console.log('connected to db & listening on port', config.port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
