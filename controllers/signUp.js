const User = require("../models/User");
const axios = require("axios");

const OKTA_SIGNUP_URL = process.env.OKTA_LOGIN_URL || "";
const OKTA_TOKEN = process.env.OKTA_HEADER || "";

if (!OKTA_SIGNUP_URL || !OKTA_TOKEN) {
  throw new Error("Env variable not set.");
}

const signUpController = async (req, res, next) => {
  console.log(req.body);
  try {
    const response = await axios.post(OKTA_SIGNUP_URL, req.body, {
      headers: {
        Authorization: OKTA_TOKEN,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    try {
      const { firstName, lastName, mobilePhone, email } =
        response?.data?.profile;

      const newUser = new User({
        firstName,
        lastName,
        mobile: mobilePhone,
        email,
      });
      await newUser.save();
      res.json({ message: "User created successfully" });
    } catch (dbError) {
      console.log("Failed to save user in DB", dbError.message);
      res.status(500).json({ error: "User not saved in DB" });
    }
  } catch (oktaError) {
    console.log("Error with user creating in okta", oktaError.message);
    res.status(500).json({ error: "Error while creating user in Octa" });
  }
};

module.exports = { signUpController };
