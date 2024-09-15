DUMMYWHISHLIST = [];
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
    console.log(whishList);
    try {
      const whishlistProducts = await Product.find({ _id: { $in: whishList } });
      console.log(whishlistProducts);
      res.status(200).json(whishlistProducts);
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

const removeItemFromWhishlist = (req, res, next) => {
  const itemId = req.body.id;
  if (!itemId) {
    DUMMYWHISHLIST = [];
  } else {
    DUMMYWHISHLIST = DUMMYWHISHLIST.filter(
      (whishistItem) => whishistItem.id != itemId
    );
  }

  res.status(201).json({ message: "Successfully removed item from whishlist" });
};

module.exports = { whishlistItems, addWhishlistItem, removeItemFromWhishlist };
