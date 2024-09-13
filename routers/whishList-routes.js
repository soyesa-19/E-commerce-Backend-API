const express = require("express");
const {
  whishlistItems,
  addWhishlistItem,
  removeItemFromWhishlist,
} = require("../controllers/whishlist");

const { authVerifier } = require("../controllers/auth-verifier");

const whishlistRouter = express.Router();

whishlistRouter.get("/", authVerifier, whishlistItems);

whishlistRouter.post("/", authVerifier, addWhishlistItem);

whishlistRouter.post("/delete", authVerifier, removeItemFromWhishlist);

module.exports = whishlistRouter;
