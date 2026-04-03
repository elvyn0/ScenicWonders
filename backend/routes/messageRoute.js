const express = require("express");
const auth = require("../middlewares/auth");
const { createMessage, getMessage, getUnreadCount } = require("../controllers/messageController");

const router = express.Router();

router.post("/", auth, createMessage);
router.get("/count", auth, getUnreadCount);
router.get("/:conversationId", auth, getMessage);

module.exports = router;
