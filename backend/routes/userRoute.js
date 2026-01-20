const express = require("express");
const { registerUser, userLogin, getUser } = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.get("/profile", auth, getUser);

module.exports = userRouter;
