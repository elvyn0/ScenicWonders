const express = require("express");
const auth = require("../middlewares/auth");
const { createConverstaion, getConversationById } = require("../controllers/conversationController");

const router = express.Router();

router.post("/", auth, createConverstaion);
router.get("/:conversationId", auth, getConversationById);

module.exports = router;
