let DUMMYCART = [];
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

const cartItems = async (req, res, next) => {
  const { sub: userEmail } = req.user;
  try {
    const { cart } = await User.findOne({ email: userEmail });
    if (!cart) {
      return res.status(404).json({ error: "User with email not found." });
    }

    const productIds = cart?.map((cartItem) => cartItem.product);
    console.log(productIds);

    try {
      const cartProducts = await Product.find({ _id: { $in: productIds } });
      const cartWithDetails = cartProducts?.map((product) => {
        const cartItem = cart?.find(
          (item) => item.product.toString() === product._id.toString()
        );
        return {
          ...product._doc,
          qty: cartItem.quantity, // Add quantity from the cart
          id: product._id,
        };
      });
      res.status(200).json(cartWithDetails);
    } catch (error) {
      res.status(404).json({ message: "Cannot find cart data for the user" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Cannot fetch cart data of the user." });
  }
};

const addToCart = async (req, res, next) => {
  console.log(req.body);
  const { id, qty } = req.body.item;
  const { sub: userEmail } = req.user;

  try {
    const productId = new mongoose.Types.ObjectId(id);
    const { cart } = await User.findOne({ email: userEmail });
    console.log(cart);
    console.log(userEmail);

    if (!cart) {
      return res.status(404).json({ message: "Cart data for user not found" });
    }

    const itemExist = cart?.find((cartItem) =>
      cartItem.product.equals(productId)
    );

    if (itemExist) {
      itemExist.quantity += 1;
    } else {
      cart.push({ product: productId, quantity: qty });
    }

    await User.findOneAndUpdate(
      { email: userEmail },
      { cart: cart },
      { new: true }
    );
    res.status(201).json({ message: "Successfully updated the cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error! Cannot update the cart" });
  }
};

const removeItemFromCart = async (req, res, next) => {
  const { id, qty } = req.body;
  const { sub: userEmail } = req.user;

  try {
    const productId = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User cannot be found" });
    }

    const removeItem = user?.cart?.find((cartItem) =>
      cartItem.product.equals(productId)
    );

    if (!removeItem) {
      return res
        .status(500)
        .json({ message: "Cart item not found in cart to remove!" });
    }

    removeItem.quantity -= qty;
    if (removeItem.quantity === 0) {
      user.cart = user?.cart?.filter(
        (cartItem) => cartItem.product.toString() != id
      );
    }

    try {
      await user.save();
      res.status(201).json({ message: "Cart item removed successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error! Updated user cannot be saved",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Cannot remove item from cart" });
  }
};

module.exports = { cartItems, addToCart, removeItemFromCart };
