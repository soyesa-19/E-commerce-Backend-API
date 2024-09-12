let DUMMYWHISHLIST = [];

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
