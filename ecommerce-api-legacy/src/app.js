const express = require('express');
const AppManager = require('./AppManager');
const { config } = require('./utils');
const CheckoutService = require('./services/checkoutService');
const CheckoutController = require('./controllers/checkoutController');
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();
app.use(express.json());

const manager = new AppManager();
manager.initDb();
app.use('/api', checkoutRoutes(new CheckoutController(new CheckoutService(manager.db))));
manager.setupRoutes(app);

app.listen(config.port, () => {
    console.log(`Frankenstein LMS rodando na porta ${config.port}...`);
});
