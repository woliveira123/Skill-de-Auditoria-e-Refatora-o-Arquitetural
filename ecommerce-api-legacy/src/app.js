const express = require('express');
const AppManager = require('./AppManager');
const { config } = require('./utils');
const CheckoutService = require('./services/checkoutService');
const CheckoutController = require('./controllers/checkoutController');
const checkoutRoutes = require('./routes/checkoutRoutes');
const FinancialReportService = require('./services/financialReportService');
const AdminController = require('./controllers/adminController');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());

const manager = new AppManager();
manager.initDb();
app.use('/api', checkoutRoutes(new CheckoutController(new CheckoutService(manager.db))));
app.use('/api', adminRoutes(new AdminController(new FinancialReportService(manager.db), manager.db)));
manager.setupRoutes(app);

app.listen(config.port, () => {
    console.log(`Frankenstein LMS rodando na porta ${config.port}...`);
});
