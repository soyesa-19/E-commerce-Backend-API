const Address = require("../models/Address");
const User = require("../models/User");

const getAddressesController = async (req, res, next) => {
  const { sub: userEmail } = req.user;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }

    //Finding all addresses related with the user
    const addresses = await Address.find({ user: user._id });

    if (!addresses) {
      return res
        .status(404)
        .json({ message: " Error while fetching the addresses" });
    }

    res.status(200).json({
      addresses: addresses.map((address) =>
        address.toObject({ getters: true })
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching user addresses.",
    });
  }
};

const postAddressController = async (req, res, next) => {
  const { sub: userEmail } = req.user;
  const { customerName, type, address, contact } = req.body;
  console.log(customerName);

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(500).json({ message: "Error while adding addresses" });
    }

    const newAddress = new Address({
      customerName,
      type,
      address,
      contact,
      user: user._id,
    });

    await newAddress.save();
    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while adding address for user" });
  }
};

module.exports = { getAddressesController, postAddressController };
