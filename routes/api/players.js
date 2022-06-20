const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { catchErrors } = require("../../handlers/errorHandlers");

const playerController = require("../../controllers/playerController");

/**
 * /api/players
 */
router.get("/add", playerController.addPlayer);
router.post("/add", catchErrors(playerController.createPlayer));
router.get("/getPlayers", playerController.getPlayers);
router.get(
  "/getTournamentPlayers/:tournamentId",
  playerController.getTournamentPlayers
);
router.get("/details/:id", playerController.getPlayerDetails);
router.post("/updateHole", catchErrors(playerController.updateHole));
router.post("/updateScore", catchErrors(playerController.updateScore));

module.exports = router;
