require("dotenv").config();
const axios = require("axios");

const express = require("express");
const bodyparser = require("body-parser");
const productRouter = require("./routers/products-routes");
const cartRouter = require("./routers/cart-routes");
const whishlistRouter = require("./routers/whishList-routes");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const PORT = process.env.PORT;
const OKTA_API_TOKEN = process.env.OKTA_API_TOKEN;
const OKTA_ISSUER = process.env.OKTA_ISSUER;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow these methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Send a 204 response for OPTIONS requests
  }
  next();
});
app.use("/api/products", productRouter);
app.use("/api/cartProds", cartRouter);
app.use("/api/whishlist", whishlistRouter);

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(
      "https://dev-37549338.okta.com/api/v1/users?activate=true",
      req.body,
      {
        headers: {
          Authorization: `SSWS 0020M1RKnT8kUviA4CNG6FC330yNcxF5u8W9ii2IAv`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(error).json(error);
  }
});
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
