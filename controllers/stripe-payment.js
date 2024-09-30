const stripePaymentGateway = (req, res, next) => {
  const { products } = req.body.params;
  console.log(products);
};

module.exports = { stripePaymentGateway };
