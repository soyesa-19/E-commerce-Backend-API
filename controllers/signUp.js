const User = require("../models/User");
const axios = require("axios");

const OKTA_SIGNUP_URL = process.env.OKTA_LOGIN_URL || "";
const OKTA_TOKEN = process.env.OKTA_HEADER || "";
const OKTA_ASSIGN_APP_URL = process.env.OKTA_ASSIGN_APP_URL || "";

if (!OKTA_SIGNUP_URL || !OKTA_TOKEN || !OKTA_ASSIGN_APP_URL) {
  throw new Error("Env variable not set.");
}

const signUpController = async (req, res, next) => {
  try {
    const response = await axios.post(OKTA_SIGNUP_URL, req.body, {
      headers: {
        Authorization: OKTA_TOKEN,
        "Content-Type": "application/json",
      },
    });
    try {
      const okta_id = response?.data?.id;

      const resData = await axios.post(
        OKTA_ASSIGN_APP_URL,
        {
          id: okta_id, // The user ID from Okta
          scope: "USER",
        },
        {
          headers: {
            Authorization: OKTA_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

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
        res.status(200).json({ message: "User created successfully" });
      } catch (error) {
        console.log("Failed to save user in DB", error.message);
        res.status(500).json({ error: "User not saved in DB" });
      }
    } catch (dbError) {
      console.log(
        "failed to assign user to aplication in ota",
        dbError.message
      );
      res
        .status(500)
        .json({ error: "failed to assign user to aplication in ota" });
    }
  } catch (oktaError) {
    console.log("Error with user creating in okta", oktaError.message);
    res.status(500).json({ error: "Error while creating user in Octa" });
  }
};

module.exports = { signUpController };
