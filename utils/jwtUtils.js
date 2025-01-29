const jwt = require('jsonwebtoken');
const config = require('../config/config');

function signPayload(payload) {
    return jwt.sign(payload, config.secureKey, {
        algorithm: 'HS256',
        header: {
            alg: 'HS256',
            typ: 'JWT',
            clientid: config.clientId,
        },
    });
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, config.secureKey);
        return decoded;
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
}

module.exports = {
    signPayload,
    verifyToken,
};