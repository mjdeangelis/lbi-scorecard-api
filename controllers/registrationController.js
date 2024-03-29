const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Tournament = require('../models/Tournament');
const Team = mongoose.model('Team');
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY);

const calculateChargeAmount = (id) => {
  switch (id) {
    case 'lbi-presale-individual':
      return 16000;
    case 'lbi-presale-team':
      return 32000;
    default:
      throw Error('Unkown charge amount.');
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { id, customer } = req.body;

  console.log('customer', customer);

  stripeCustomer = await stripe.customers.create({
    name: customer.name,
    phone: customer.phone,
    // todo: add email?
  });

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateChargeAmount(id),
    currency: 'usd',
    customer: stripeCustomer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.registerTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    return res.status(200).send({ status: 'SUCCESS', teamId: team._id });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const updatedTeamData = req.body;

    // Update the team in the database
    await Team.findByIdAndUpdate(teamId, updatedTeamData, { new: true });

    return res.status(200).send({ status: 'SUCCESS', teamId });
  } catch (error) {
    // Handle errors (e.g., team not found, validation errors)
    res.status(500).send(error.message);
  }
};
