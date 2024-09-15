let DUMMYCART = [];
const User = require("../models/User");

const cartItems = async (req, res, next) => {
  const { sub: userEmail } = req.user;
  try {
    const { cart } = await User.findOne({ email: userEmail });
    if (!cart) {
      return res.status(404).json({ error: "User with email not found." });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Cannot fetch cart data of the user." });
  }
};

const addToCart = (req, res, next) => {
  console.log(req.body);
  const new_item = req.body.item;
  const isItemExist = DUMMYCART.find((item) => item.id === new_item.id);
  if (!isItemExist) {
    DUMMYCART.push({ ...new_item, qty: 1, totalPrice: new_item.price });
  } else {
    isItemExist.totalPrice += new_item.price;
    isItemExist.qty += 1;
  }
  res.status(201).json({ message: "Successfully updated cart" });
};

const removeItemFromCart = (req, res, next) => {
  const itemId = req.body.id;
  const newItem = DUMMYCART.find((cartItem) => cartItem.id === itemId);
  if (newItem.qty === 1) {
    DUMMYCART = DUMMYCART.filter((cartItem) => cartItem.id != itemId);
  } else {
    newItem.qty -= 1;
    newItem.totalPrice -= newItem.price;
  }

  res.status(201).json({ message: "Successfully deleted item from cart" });
};

module.exports = { cartItems, addToCart, removeItemFromCart };
