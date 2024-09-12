const express = require("express");
const {
  cartItems,
  addToCart,
  removeItemFromCart,
} = require("../controllers/cart");

const cartRouter = express.Router();

cartRouter.get("/", cartItems);

cartRouter.post("/", addToCart);

cartRouter.post("/delete", removeItemFromCart);

module.exports = cartRouter;
