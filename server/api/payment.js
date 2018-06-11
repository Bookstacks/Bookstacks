const stripe = require('../constants/stripe');
const router = require('express').Router()
module.exports = router

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

router.get('/', (req, res) => {
  res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
});

//use the stripe library to create a official Stripe payment
//receives the incoming payload from frontend application,
//all the credit card information and optional information
//and a callback function that executes after the request to the Stripe API succeeds or fails.
router.post('/', (req, res) => {
  stripe.charges.create({...req.body, receipt_email: req.body.email}, postStripeCharge(res));
});

