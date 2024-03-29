const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { catchErrors } = require('../../handlers/errorHandlers');

const registrationController = require('../../controllers/registrationController');

/**
 * /api/registration
 */
router.post(
  '/create-payment-intent',
  catchErrors(registrationController.createPaymentIntent)
);
router.post('/register-team', catchErrors(registrationController.registerTeam));
router.post(
  '/update-team/:teamId',
  catchErrors(registrationController.updateTeam)
);

module.exports = router;
