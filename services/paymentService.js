const request = require('request');
const { format } = require('date-and-time');
const config = require('../config/config');
const { signPayload, verifyToken } = require('../utils/jwtUtils');

async function createOrder(orderData, headers) {
    const now = new Date();
    const timestamp = format(now, 'YYYYMMDDHHmmss');

    const payload = {
        mercid: config.merchantId,
        orderid: orderData.orderid || `TEST${timestamp}`,
        amount: orderData.amount || '299.28',
        order_date: orderData.order_date || "2023-03-14T15:14:39+05:30",
        currency: '356',
        ru: 'https://www.billdesk.com',
        itemcode: 'DIRECT',
        customer: orderData.customer,
        device: {
            init_channel: 'internet',
            ip: orderData.device.ip,
            user_agent: headers['user-agent'],
            accept_header: headers['accept'],
        },
        additional_info: orderData.additional_info,
    };

    const signedPayload = signPayload(payload);

    return new Promise((resolve, reject) => {
        request.post(
            config.billdeskUrl,
            {
                headers: {
                    'Content-Type': 'application/jose',
                    'Accept': 'application/jose',
                    'BD-Timestamp': timestamp,
                    'BD-Traceid': timestamp,
                },
                body: signedPayload,
            },
            (error, response, body) => {
                if (error) {
                    console.error('API Call Error:', error);
                    reject(error);
                } else {
                    const decodedResponse = verifyToken(body); // Decode JWT response
                    if (decodedResponse) {
                        resolve(decodedResponse);
                    } else {
                        reject(new Error('Invalid response from BillDesk'));
                    }
                }
            }
        );
    });
}

module.exports = {
    createOrder,
};