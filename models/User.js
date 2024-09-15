const mongoose = require("mongoose");
const { cartItemSchema } = require("./CartItem");
const { whishlistItemSchema } = require("./WhishList");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number },
  cart: [cartItemSchema],
  whishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", userSchema);
