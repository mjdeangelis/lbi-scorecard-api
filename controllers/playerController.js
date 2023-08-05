const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Tournament = require('../models/Tournament');
const Player = mongoose.model('Player');

const getHoleTotalScore = (hole) =>
  hole.scores.reduce((total, playerScore) => total + playerScore);

// const getHoleTotalTeamScore = (hole) =>
//   hole.scores.reduce((total, playerScore) => total + playerScore);

exports.addPlayer = (req, res) => {
  res.render('editPlayer', {
    title: 'Add Player',
  });
};

exports.createPlayer = async (req, res) => {
  const player = new Player(req.body);
  player.netScore = -player.handicap;
  player.password = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  await player.save();
  res.send('Player submitted');
};

exports.getPlayers = async (req, res) => {
  const players = await Player.find({
    tournament: ObjectId('62a5fbec546a2d217f7168f4'),
  });
  res.json(players);
};

exports.getTournamentPlayers = async (req, res) => {
  const players = await Player.find({
    tournament: ObjectId(req.params.tournamentId),
  });
  res.json(players);
};

exports.getPlayerDetails = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.json(player);
};

exports.updateHole = async (req, res) => {
  const player = await Player.findById(req.body.id);
  player.currentHole = req.body.currentHole;
  await player.save();
  res.json(player);
};

exports.updateScore = async (req, res) => {
  const player = await Player.findById(req.body.id);
  const course = await Tournament.findById(ObjectId(player.tournament));

  // Update scores for hole
  player.scorecard[req.body.currentHole - 1].scores = req.body.newScores.map(
    (newScore) => Number(newScore)
  );

  // Flag that player has played hole
  player.scorecard[req.body.currentHole - 1].playedHole = true;

  // Update player total score
  player.totalScore = player.scorecard.reduce(
    (total, hole) => total + getHoleTotalScore(hole),
    0
  );

  // Update player par score
  player.parScore = player.scorecard.reduce((total, hole, currentIndex) => {
    const holeScore = getHoleTotalScore(hole);
    const result =
      holeScore !== 0 ? holeScore - course.holes[currentIndex].par * 2 : 0;
    return result + total;
  }, 0);

  // Update player net score
  player.netScore = player.totalScore - player.handicap;

  // Update player thru value
  player.thru = player.scorecard.reduce((total, hole) => {
    if (hole.playedHole) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  await player.save();
  res.json(player);
};

exports.updateTeamScore = async (req, res) => {
  const player = await Player.findById(req.body.id);
  const course = await Tournament.findById(ObjectId(player.tournament));

  // Update scores for hole
  player.scorecard[req.body.currentHole - 1].teamScore = Number(
    req.body.newScores
  );

  // Flag that player has played hole
  player.scorecard[req.body.currentHole - 1].playedHole = true;

  // Update team total score
  player.totalScore = player.scorecard.reduce(
    (total, hole) => total + hole.teamScore,
    0
  );

  // Update team par score
  console.log('player.scorecard', player.scorecard);
  player.parScore = player.scorecard.reduce((total, hole, currentIndex) => {
    const holeScore = hole.teamScore;
    const result =
      holeScore !== 0 ? holeScore - course.holes[currentIndex].par : 0;
    return result + total;
  }, 0);
  player.netParScore = player.parScore - player.handicap;

  // Update player net score
  player.netScore = player.totalScore - player.handicap;

  // Update player thru value
  player.thru = player.scorecard.reduce((total, hole) => {
    if (hole.playedHole) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  await player.save();
  res.json(player);
};
