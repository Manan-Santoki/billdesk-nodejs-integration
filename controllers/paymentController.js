const paymentService = require('../services/paymentService');

async function createPaymentOrder(req, res) {
    try {
        const orderData = req.body;
        const headers = req.headers;
        const decodedResponse = await paymentService.createOrder(orderData, headers);

        res.status(200).json(decodedResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

module.exports = {
    createPaymentOrder,
};