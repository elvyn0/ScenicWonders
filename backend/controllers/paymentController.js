const Stripe = require("stripe");

// stripe config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const { hotelId, hotelName, nights, rooms, firstName, lastName, pricePerNight } = req.body;

    if (!hotelId || !hotelName || !nights || !rooms || !firstName || !lastName) {
      return res.status(400).json({ success: false, message: "Required data is empty" });
    }

    const totalPrice = pricePerNight * nights * rooms;

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
          quantity: rooms,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/booking-success`,
      cancel_url: `${process.env.FRONTEND_URL}/booking-cancel`,
    });
    console.log("RUNNING VERSION CHECK");
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Create checkOut session Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createCheckoutSession;
