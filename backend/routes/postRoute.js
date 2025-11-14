const express = require("express");
const { addPost, listPost, removePost, singlePost } = require("../controllers/postController");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");

const postRouter = express.Router();

// PROTECTED ROUTES
postRouter.post("/add", auth, upload.fields([{ name: "image", maxCount: 1 }]), addPost);
postRouter.post("/remove", auth, removePost);

// PUBLIC ROUTES (Anyone can view)
postRouter.get("/list", listPost);
postRouter.get("/get/:id", singlePost);

module.exports = postRouter;
