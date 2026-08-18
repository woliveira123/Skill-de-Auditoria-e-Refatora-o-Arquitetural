const express = require('express');

module.exports = function checkoutRoutes(checkoutController) {
  const router = express.Router();
  router.post('/checkout', checkoutController.checkout.bind(checkoutController));
  return router;
};
