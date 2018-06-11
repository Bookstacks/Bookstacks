const deployedSite = '';
//const deployedSite = 'https://bookstacks42.herokuapp.com/api/payment';
const PAYMENT_SERVER_URL = deployedSite || '/server/api/payment';
const STRIPE_PUBLISHABLE = 'pk_test_x0IxQoDobojRg90z4RYRTlMg';

export {PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE};
