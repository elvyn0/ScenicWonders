const express = require("express");
const { addBlog, listBlog, removeBlog, singleBlog } = require("../controllers/blogcontroller");
const auth = require("../middlewares/auth");

const blogRouter = express.Router();

// PROTECTED ROUTES
blogRouter.post("/add", auth, addBlog);
blogRouter.post("/remove", auth, removeBlog);

// PUBLIC ROUTES (Anyone can view)

blogRouter.get("/list", listBlog);
blogRouter.get("/get/:id", singleBlog);

module.exports = blogRouter;
