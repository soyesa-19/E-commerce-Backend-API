const express = require("express");
const {
  cartItems,
  addToCart,
  removeItemFromCart,
} = require("../controllers/cart");
const { authVerifier } = require("../controllers/auth-verifier");

const cartRouter = express.Router();

cartRouter.get("/", authVerifier, cartItems);

cartRouter.post("/", authVerifier, addToCart);

cartRouter.post("/delete", authVerifier, removeItemFromCart);

module.exports = cartRouter;
