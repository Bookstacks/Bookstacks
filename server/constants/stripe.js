const configureStripe = require('stripe');
const STRIPE_SECRET_KEY = 'sk_test_piNnkmVY69qwVVJDrxWrelo1';
const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
