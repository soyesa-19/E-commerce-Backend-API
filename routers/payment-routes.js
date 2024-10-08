const express = require("express");
const { stripePaymentGateway } = require("../controllers/stripe-payment");
const { authVerifier } = require("../controllers/auth-verifier");

const stripePaymentRouter = express.Router();

stripePaymentRouter.post("/", authVerifier, stripePaymentGateway);

module.exports = stripePaymentRouter;
