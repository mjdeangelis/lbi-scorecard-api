require('dotenv').config({ path: 'variables.env' });

const mongoose = require('mongoose');
const playerModel = require('../models/Player');
// const Player = mongoose.model('Player', playerSchema);

const Player = mongoose.model('Player');

// Connect to our Database and handle any bad connections
console.log(process.env.DATABASE);

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

playerModel.clearScores();
