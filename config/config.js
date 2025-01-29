const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secureKey: process.env.BILLDESK_SECURE_KEY,
    merchantId: process.env.BILLDESK_MERCHANT_ID,
    clientId: process.env.BILLDESK_CLIENT_ID,
    billdeskUrl: process.env.BILLDESK_URL,
    port: process.env.PORT || 3333,
};