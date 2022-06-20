const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { catchErrors } = require('../../handlers/errorHandlers');

const tournamentController = require('../../controllers/tournamentController')

/**
 * /api/tournaments
 */
router.get('/add', tournamentController.addTournament);
router.post('/add', catchErrors(tournamentController.createTournament))
router.get('/getTournament/:id', tournamentController.getTournament);


module.exports = router;