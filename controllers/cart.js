let DUMMYCART = [
  {
    id: 4,
    qty: 1,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    totalPrice: 15.99,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },

  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    qty: 1,
    price: 168,
    totalPrice: 168,
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  },
];

const cartItems = (req, res, next) => {
  res.status(200).json(DUMMYCART);
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
