require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const productRouter = require("./routers/products-routes");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log("Server started at port 5000");
});
