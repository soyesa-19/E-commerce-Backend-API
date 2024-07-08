const fetchProducts = require("../utils/fetchProducts");

const productController = async (req, res, next) => {
  const data = await fetchProducts();
  res.json(data);
};

module.exports = productController;
