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
  let { id, customer, description } = req.body;

  console.log('customer', customer);

  stripeCustomer = await stripe.customers.create({
    name: customer.name,
    phone: customer.phone,
  });

  console.log('StripeCustomer', stripeCustomer);

  const requestBody = {
    amount: calculateChargeAmount(id),
    currency: 'usd',
    customer: stripeCustomer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  };

  if (description) {
    requestBody.description = description;
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create(requestBody);

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    customerId: stripeCustomer.id,
  });
};

exports.updatePaymentIntent = async (req, res) => {
  let { id, customer, customerId, description, paymentIntentId } = req.body;

  console.log('req.body', req.body);

  stripeCustomer = await stripe.customers.update(customerId, {
    name: customer.name,
    phone: customer.phone,
  });

  console.log('StripeCustomer', stripeCustomer);

  const requestBody = {
    amount: calculateChargeAmount(id),
    currency: 'usd',
    customer: stripeCustomer.id,
  };

  if (description) {
    requestBody.description = description;
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.update(
    paymentIntentId,
    requestBody
  );

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    customerId: stripeCustomer.id,
  });
};

exports.updateCustomer = async (req, res) => {
  const { customerId, teamId, email } = req.body;

  console.log(
    `Updating resource with parameters: teamId: ${teamId}, customerId: ${customerId}, email: ${email}`
  );

  const stripeCustomer = await stripe.customers.update(customerId, {
    email,
  });

  console.log('Created stripeCustomer:', stripeCustomer.id);

  // Update the team in the database
  const updatedTeam = await Team.findByIdAndUpdate(
    teamId,
    { email },
    { new: true }
  );

  console.log('Updated team with _id:', updatedTeam._id);

  res.send({
    customerId: stripeCustomer.id,
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
