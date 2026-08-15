const express = require("express");
const {
  registerUser,
  userLogin,
  getUser,
  adminLogin,
  getUserProfile,
  getMe,
  getUsersList,
  updateUserprofile,
  userLogout,
  handleDeleteUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.post("/admin/login", adminLogin);
userRouter.put("/update-profile", auth, upload.single("profilePic"), updateUserprofile);
userRouter.get("/users", auth, getUsersList);
userRouter.get("/me", auth, getMe);
userRouter.get("/:userId", getUser);
userRouter.get("/profile/:userId", getUserProfile);
userRouter.post("/logout", userLogout);
userRouter.delete("/delete-account", auth, handleDeleteUser);

module.exports = userRouter;
