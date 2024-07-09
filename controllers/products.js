require("dotenv").config();
const fetchProducts = require("../utils/fetchProducts");
const PRODUCTS_API = process.env.PRODUCTS_API;

const productController = async (req, res, next) => {
  const data = await fetchProducts(PRODUCTS_API);
  res.json(data);
};

const productDetails = async (req, res, next) => {
  const prodId = req.query.prodId;
  const URL = PRODUCTS_API + `/${prodId}`;
  res.json(await fetchProducts(URL));
};

module.exports = { productController, productDetails };
