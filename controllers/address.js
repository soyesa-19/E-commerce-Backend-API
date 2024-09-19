const Address = require("../models/Address");
const User = require("../models/User");

const getAddressesController = async (req, res, next) => {
  const { sub: userEmail } = req.user;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }

    res.status(200).json({
      addresses: user?.addresses.map((address) =>
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
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $push: {
          addresses: {
            customerName,
            type,
            address,
            contact,
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(500).json({ message: "Error while adding addresses" });
    }
    console.log(user.addresses);
    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getAddressesController, postAddressController };
