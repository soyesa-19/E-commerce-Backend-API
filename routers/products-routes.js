const express = require("express");
const productController = require("../controllers/products");
const productRouter = express.Router();

productRouter.get("/", productController);

module.exports = productRouter;
