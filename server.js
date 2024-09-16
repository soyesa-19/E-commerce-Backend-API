require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const productRouter = require("./routers/products-routes");
const cartRouter = require("./routers/cart-routes");
const whishlistRouter = require("./routers/whishList-routes");
const signUpRouter = require("./routers/siguUp-routes");
const ConnectDBAndStartServer = require("./connect-db");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

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
app.use("/api/signup", signUpRouter);

ConnectDBAndStartServer(app);
