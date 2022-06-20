const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const scorecardType = [
  {
    hole: Number,
    score: Number,
    adjustedScore: Number,
  },
];
const defaultScorecard = [
  {
    hole: 1,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 2,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 3,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 4,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 5,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 6,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 7,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 8,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 9,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 10,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 11,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 12,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 13,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 14,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 15,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 16,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 17,
    score: 0,
    adjustedScore: 0,
  },
  {
    hole: 18,
    score: 0,
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
    ref: "Tournament",
    default: ObjectId("62acee1f82eee941e40ee295"),
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
    // add players
  },
});

module.exports = mongoose.model("Player", playerSchema);
