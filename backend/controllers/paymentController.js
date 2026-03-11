const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { hotelName, pricePerNight, nights, rooms } = req.body;

    if (!hotelName || !pricePerNight || !nights || !rooms) {
      return res.status(400).json({ success: false, message: "Required data is empty" });
    }

    const totalPrice = pricePerNight * nights * rooms;
    console.log("totalPrice", totalPrice);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: hotelName,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/booking-success`,
      cancel_url: `${process.env.FRONTEND_URL}/booking-cancel`,
    });
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createCheckoutSession;
