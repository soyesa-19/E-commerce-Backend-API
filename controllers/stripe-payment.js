const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const stripePaymentGateway = async (req, res, next) => {
  const { products } = req.body.params;
  console.log(products);
  const line_items = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product?.title,
      },
      unit_amount: product?.price * 100,
    },
    quantity: product?.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:3000/payment/success`,
      cancel_url: `http://localhost:3000/payment/error`,
    });

    if (!session) {
      return res.status(500).json({
        message:
          "Internal server error, cannot create session with stripe gateway",
      });
    }
    res.status(201).json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { stripePaymentGateway };
