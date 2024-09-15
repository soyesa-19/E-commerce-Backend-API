const mongoose = require("mongoose");

const whishlistItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = { whishlistItemSchema };
