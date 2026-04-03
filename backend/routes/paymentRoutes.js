const express = require("express");
const auth = require("../middlewares/auth");
const createCheckoutSession = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", auth, createCheckoutSession);

module.exports = paymentRouter;
