const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Address", addressSchema);
