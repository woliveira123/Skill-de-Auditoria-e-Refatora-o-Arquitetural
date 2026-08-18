const express = require('express');
module.exports = (controller) => {
  const router = express.Router();
  router.get('/admin/financial-report', controller.report.bind(controller));
  router.delete('/users/:id', controller.deleteUser.bind(controller));
  return router;
};
