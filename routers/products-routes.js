const express = require("express");
const productController = require("../controllers/products");
const productDetails = require("../controllers/products");
const productRouter = express.Router();

productRouter.get("/", productController);

productRouter.get("/productDetails", productDetails);

module.exports = productRouter;
