const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const registeredPlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  shirtSize: {
    type: String,
    enum: ['small', 'medium', 'large', 'x-large'], // Assuming these are the only valid sizes
    required: true,
  },
  averageScore: {
    type: String,
    required: true,
  },
});

const RegisteredPlayer = mongoose.model(
  'RegisteredPlayer',
  registeredPlayerSchema
);

module.exports = { RegisteredPlayer, registeredPlayerSchema };
