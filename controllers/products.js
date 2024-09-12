require("dotenv").config();
const Product = require("../models/Product");

const productController = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(405).json({ message: "Cannot fetch list of products" });
  }
};

const addProductsController = async (req, res, next) => {
  try {
    await Product.insertMany(req.body.products);
    res.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    console.log(error);
    res.status(405).json({ message: "Cannot add products to database" });
  }
};

const productDetails = async (req, res, next) => {
  const { prodId } = req.query;
  try {
    const productDetails = await Product.findById(prodId);
    res.status(201).json(productDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const productsByCategory = async (req, res, next) => {
  const { ctg } = req.query;
  try {
    const categoryProducts = await Product.find({ category: ctg });
    res.status(201).json(categoryProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot find products for this category" });
  }
};

module.exports = {
  productController,
  productDetails,
  addProductsController,
  productsByCategory,
};
