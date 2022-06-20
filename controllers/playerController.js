const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Tournament = require("../models/Tournament");
const Player = mongoose.model("Player");

exports.addPlayer = (req, res) => {
  res.render("editPlayer", {
    title: "Add Player",
  });
};

exports.createPlayer = async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.send("Player submitted.");
};

exports.getPlayers = async (req, res) => {
  const players = await Player.find({
    tournament: ObjectId("62a5fbec546a2d217f7168f4"),
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
  const course = await Tournament.findById("62acee1f82eee941e40ee295"); // todo: this id should be attached to the player
  player.scorecard[req.body.currentHole - 1].score = req.body.newScore;
  player.totalScore = player.scorecard.reduce(
    (total, hole) => total + hole.score,
    0
  );
  player.parScore = player.scorecard.reduce((total, hole, currentIndex) => {
    const result =
      hole.score !== 0 ? hole.score - course.holes[currentIndex].par : 0;
    return result + total;
  }, 0);
  await player.save();
  res.json(player);
};
