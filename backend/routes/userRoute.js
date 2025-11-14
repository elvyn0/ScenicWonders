const express = require("express");
const { registerUser, userLogin, adminLogin } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);

module.exports = userRouter;
