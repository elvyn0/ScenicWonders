const express = require("express");

const { chatWithAi } = require("../controllers/Bot/chatBotController");

const botRouter = express.Router();

botRouter.post("/chat", chatWithAi);

module.exports = botRouter;
