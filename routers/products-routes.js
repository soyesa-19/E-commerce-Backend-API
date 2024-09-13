const express = require("express");
const {
  productController,
  productDetails,
  addProductsController,
  productsByCategory,
} = require("../controllers/products");
const productRouter = express.Router();

productRouter.get("/", productController);

productRouter.post("/", addProductsController);

productRouter.get("/productDetails", productDetails);

productRouter.get("/category", productsByCategory);

module.exports = productRouter;
