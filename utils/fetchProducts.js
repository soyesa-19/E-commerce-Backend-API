require("dotenv").config();
const axios = require("axios");

const PRODUCTS_API = process.env.PRODUCTS_API;

const fetchProducts = async () => {
  const response = await axios.get(PRODUCTS_API);
  return response?.data;
};

module.exports = fetchProducts;
