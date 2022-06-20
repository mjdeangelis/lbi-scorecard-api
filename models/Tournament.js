const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseRating: {
    type: String,
    required: true,
  },
  courseSlope: {
    type: String,
    required: true,
  },
  holes: {
    type: [
      {
        hole: Number,
        par: Number,
      },
    ],
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

module.exports = mongoose.model("Tournament", tournamentSchema);
