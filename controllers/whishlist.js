const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");

const whishlistItems = async (req, res, next) => {
  const { sub: userEmail } = req.user;
  try {
    const { whishList } = await User.findOne({ email: userEmail });
    if (!whishList) {
      return res.status(404).json({ error: "User with email not found." });
    }
    try {
      const whishlistProducts = await Product.find({ _id: { $in: whishList } });
      res.status(200).json({
        whishlistProducts: whishlistProducts.map((item) =>
          item.toObject({ getters: true })
        ),
      });
    } catch (error) {
      res
        .json(500)
        .json({ message: "Cannot fetch whishlist data for the user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot fetch whishlist data of the user." });
  }
};

const addWhishlistItem = async (req, res, next) => {
  const { id: productId } = req.body.item;
  const { sub: userEmail } = req.user;
  try {
    const check = await User.findOneAndUpdate(
      { email: userEmail },
      { $addToSet: { whishList: new mongoose.Types.ObjectId(productId) } },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Successfully updated user whishlist data" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured while updating whishlist in db" });
  }
};

const removeItemFromWhishlist = async (req, res, next) => {
  const { id: itemId } = req.body;
  const { sub: userEmail } = req.user;

  if (!itemId) {
    return res.status(500).json({
      message: "Error! cannot find the itemd id to remove in the request body",
    });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { whishList: new mongoose.Types.ObjectId(itemId) } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Error! User with email id not found" });
    }
    res
      .status(201)
      .json({ message: "Successfully removed whihslist item for user" });
  } catch (error) {
    res.status(500).json({
      message:
        "Error! Internal server error. Cannot delete item from whishlist",
    });
  }
};

module.exports = { whishlistItems, addWhishlistItem, removeItemFromWhishlist };
