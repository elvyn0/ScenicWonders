const express = require("express");
const { registerUser, userLogin, getUser, adminLogin } = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", userLogin);
userRouter.post("/admin/login", adminLogin);
userRouter.get("/user/profile", auth, getUser);

module.exports = userRouter;
