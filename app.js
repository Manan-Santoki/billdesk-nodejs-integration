const express = require('express');
const config = require('./config/config');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());

app.use('/api/payments', paymentRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});