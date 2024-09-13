const User = require("../models/User");
const axios = require("axios");

const OKTA_SIGNUP_URL = process.env.OKTA_LOGIN_URL;
const OKTA_TOKEN = process.env.OKTA_HEADER;

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
    const { firstName, lastName, mobilePhone, email } = response?.data?.profile;

    const newUser = new User({
      firstName,
      lastName,
      mobile: mobilePhone,
      email,
    });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(error).json(error);
  }
};

module.exports = { signUpController };
