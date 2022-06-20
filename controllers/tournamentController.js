const mongoose = require("mongoose");
const Tournament = mongoose.model("Tournament");

exports.addTournament = (req, res) => {
  res.render("editTournament", {
    title: "Add Tournament",
  });
};

exports.createTournament = async (req, res) => {
  const tournament = new Tournament(req.body);
  await tournament.save();
  res.send("Tournament submitted.");
};

exports.getTournament = async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  res.json(tournament);
};
