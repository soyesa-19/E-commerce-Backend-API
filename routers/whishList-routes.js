const express = require("express");
const {
  whishlistItems,
  addWhishlistItem,
  removeItemFromWhishlist,
} = require("../controllers/whishlist");

const whishlistRouter = express.Router();

whishlistRouter.get("/", whishlistItems);

whishlistRouter.post("/", addWhishlistItem);

whishlistRouter.post("/delete", removeItemFromWhishlist);

module.exports = whishlistRouter;
