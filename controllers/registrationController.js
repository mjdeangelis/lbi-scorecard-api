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

exports.createPaymentIntent = async (req, res, next) => {
  let stripeCustomer, paymentIntent;
  let { id, customer, description } = req.body;

  console.log(
    `Creating payment intent with parameters: id: ${id}, customer.name: ${customer.name}, customer.phone: ${customer.phone}, description: ${description}`
  );

  try {
    stripeCustomer = await stripe.customers.create({
      name: customer.name,
      phone: customer.phone,
    });
  } catch (error) {
    console.error(error);
    // throw error;
    return next(error);
  }

  console.log(`Stripe customer created: ${stripeCustomer.id}`);

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

  try {
    // Create a PaymentIntent with the order amount and currency
    paymentIntent = await stripe.paymentIntents.create(requestBody);
  } catch (error) {
    console.error(error);
    // throw error;
    return next(error);
  }

  console.log(`Payment intent created: ${paymentIntent.id}`);

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    customerId: stripeCustomer.id,
  });
};

exports.updatePaymentIntent = async (req, res, next) => {
  let stripeCustomer, paymentIntent;
  let { id, customer, customerId, description, paymentIntentId } = req.body;

  console.log(
    `Updating payment intent with parameters: id: ${id}, customerId: ${customerId}, customer.name: ${customer.name}, paymentIntentId: ${paymentIntentId}`
  );

  try {
    stripeCustomer = await stripe.customers.update(customerId, {
      name: customer.name,
      phone: customer.phone,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }

  console.log(`Stripe customer updated ${stripeCustomer.id}`);

  const requestBody = {
    amount: calculateChargeAmount(id),
    currency: 'usd',
    customer: stripeCustomer.id,
  };

  if (description) {
    requestBody.description = description;
  }

  try {
    // Update a PaymentIntent with the order amount and currency
    paymentIntent = await stripe.paymentIntents.update(
      paymentIntentId,
      requestBody
    );
  } catch (error) {
    console.error(error);
    // throw error;
    return next(error);
  }

  console.log(`Payment intent updated: ${paymentIntent.id}`);

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    customerId: stripeCustomer.id,
  });
};

exports.updateCustomer = async (req, res, next) => {
  let stripeCustomer, updatedTeam;
  const { customerId, teamId, email } = req.body;

  console.log(
    `Updating customer with parameters: teamId: ${teamId}, customerId: ${customerId}, email: ${email}`
  );

  try {
    stripeCustomer = await stripe.customers.update(customerId, {
      email,
    });
  } catch (error) {
    console.error(error);
    // throw error;
    return next(error);
  }

  console.log(`Updated Stripe customer: ${stripeCustomer.id}`);

  // Update the team in the database
  try {
    updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { email },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    // throw error;
    return next(error);
  }

  console.log(`Updated team: ${updatedTeam._id}`);

  res.send({
    customerId: stripeCustomer.id,
  });
};

exports.registerTeam = async (req, res, next) => {
  console.log(`Registering team for player: ${req.body.players[0].name}`);
  try {
    const team = new Team(req.body);
    await team.save();
    return res.status(200).send({ status: 'SUCCESS', teamId: team._id });
  } catch (error) {
    console.error(error);
    // throw error;
    return next(error);
  }
};

exports.updateTeam = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const updatedTeamData = req.body;

    // Update the team in the database
    await Team.findByIdAndUpdate(teamId, updatedTeamData, { new: true });

    return res.status(200).send({ status: 'SUCCESS', teamId });
  } catch (error) {
    // Handle errors (e.g., team not found, validation errors)
    // res.status(500).send(error.message);
    return next(error);
  }
};
