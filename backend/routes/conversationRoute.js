const express = require("express");
const auth = require("../middlewares/auth");
const { createConverstaion } = require("../controllers/conversationController");

const router = express.Router();

router.post("/", auth, createConverstaion);

module.exports = router;
