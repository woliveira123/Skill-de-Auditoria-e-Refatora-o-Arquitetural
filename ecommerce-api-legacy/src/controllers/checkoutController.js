class CheckoutController {
  constructor(service) { this.service = service; }
  checkout(req, res) {
    this.service.checkout(req.body, (error, result) => {
      if (error) return res.status(error.status || 500).json({ error: error.message });
      return res.status(200).json(result);
    });
  }
}
module.exports = CheckoutController;
