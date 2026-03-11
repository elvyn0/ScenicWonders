const express = require("express");

const createCheckoutSession = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", createCheckoutSession);

module.exports = paymentRouter;
