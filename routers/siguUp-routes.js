const express = require("express");
const { signUpController } = require("../controllers/signUp");

const signUpRouter = express.Router();

signUpRouter.post("/", signUpController);

module.exports = signUpRouter;
