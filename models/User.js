const mongoose = require("mongoose");
const { addressSchema } = require("./Address");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  whishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  addresses: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);
