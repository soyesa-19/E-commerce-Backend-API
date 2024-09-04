let DUMMYWHISHLIST = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
];

const whishlistItems = (req, res, next) => {
  res.status(200).json(DUMMYWHISHLIST);
};

const addWhishlistItem = (req, res, next) => {
  const newItem = req.body.item;
  DUMMYWHISHLIST.push(newItem);
  res.status(201).json("Item added to whichlist successfully");
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
