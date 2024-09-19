const express = require("express");
const {
  getAddressesController,
  postAddressController,
} = require("../controllers/address");
const { authVerifier } = require("../controllers/auth-verifier");

const addressRouter = express.Router();

addressRouter.get("/", authVerifier, getAddressesController);

addressRouter.post("/", authVerifier, postAddressController);

module.exports = addressRouter;
