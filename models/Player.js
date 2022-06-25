const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const scorecardType = [
  {
    hole: Number,
    scores: [Number],
    adjustedScore: Number,
  },
];
const defaultScorecard = [
  {
    hole: 1,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 2,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 3,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 4,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 5,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 6,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 7,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 8,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 9,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 10,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 11,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 12,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 13,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 14,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 15,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 16,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 17,
    scores: [0, 0],
    adjustedScore: 0,
  },
  {
    hole: 18,
    scores: [0, 0],
    adjustedScore: 0,
  },
];

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  handicap: {
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  parScore: {
    type: Number,
    default: 0,
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    default: ObjectId('62acee1f82eee941e40ee295'),
  },
  thru: {
    type: Number,
    default: 0,
  },
  currentHole: {
    type: Number,
  },
  scorecard: {
    type: scorecardType,
    default: defaultScorecard,
  },
  players: {
    type: [
      {
        name: String,
      },
    ],
  },
});

module.exports = mongoose.model('Player', playerSchema);
