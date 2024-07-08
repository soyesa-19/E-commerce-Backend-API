const axios = require("axios");
const fetchProducts = async (URL) => {
  const response = await axios.get(URL);
  return response?.data;
};

module.exports = fetchProducts;
