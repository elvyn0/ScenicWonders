const express = require("express");

const { aiChat } = require("../controllers/aiBotController");

const aiRouter = express.Router();

aiRouter.post("/chat", aiChat);

module.exports = aiRouter;
