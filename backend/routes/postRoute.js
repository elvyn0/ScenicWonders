const express = require("express");
const { addPost, listPost, removePost, singlePost, handleLike } = require("../controllers/postController");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");

const postRouter = express.Router();

// PUBLIC ROUTES
postRouter.get("/list", listPost);
postRouter.get("/:id", optionalAuth, singlePost);

// PROTECTED ROUTES
postRouter.post("/add", auth, upload.single("image"), addPost);
postRouter.post("/like/:id", auth, handleLike);
postRouter.delete("/remove/:id", auth, removePost);

module.exports = postRouter;
