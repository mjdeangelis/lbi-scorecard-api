const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { registeredPlayerSchema } = require('./RegisteredPlayer');

mongoose.Promise = global.Promise;

const scorecardType = [
  {
    hole: Number,
    scores: [Number],
    teamScore: Number,
    playedHole: Boolean,
  },
];
const defaultScorecard = [
  {
    hole: 1,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 2,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 3,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 4,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 5,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 6,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 7,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 8,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 9,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 10,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 11,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 12,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 13,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 14,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 15,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 16,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 17,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
  {
    hole: 18,
    scores: [0, 0],
    teamScore: 0,
    playedHole: false,
  },
];

const teamSchema = new mongoose.Schema({
  isPaid: {
    type: Boolean,
    default: false,
  },
  teammateName: {
    type: String,
    required: function () {
      return !this.registeringTeammate;
    },
  },
  registeringTeammate: {
    type: Boolean,
    required: true,
  },
  players: {
    type: [registeredPlayerSchema],
    validate: [
      playerArrayValidator,
      'At least one player is required when registering a teammate',
    ],
  }, // Embedding player schema
  email: {
    type: String,
    required: false,
  },
});

// Custom validator function
function playerArrayValidator(value) {
  // If registeringTeammate is true, ensure there's at least one player
  return !this.registeringTeammate || value.length > 0;
}

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team, teamSchema };
