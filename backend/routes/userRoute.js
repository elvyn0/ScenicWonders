const express = require("express");
const {
  registerUser,
  userLogin,
  getUser,
  adminLogin,
  getUserProfile,
  getMe,
  getUsersList,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.post("/admin/login", adminLogin);
userRouter.get("/users", getUsersList);
userRouter.get("/me", auth, getMe);
userRouter.get("/:userId", getUser);
userRouter.get("/profile/:userId", getUserProfile);

module.exports = userRouter;
