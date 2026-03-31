const express = require("express");
const { addStory, listStories, removeStory, singleStory, handleLikes } = require("../controllers/storiesController");
const auth = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");

const storiesRouter = express.Router();

// PUBLIC ROUTES (Anyone can view)
storiesRouter.get("/list", optionalAuth, listStories);
storiesRouter.get("/:id", optionalAuth, singleStory);

// PROTECTED ROUTES
storiesRouter.post("/add", auth, addStory);
storiesRouter.post("/like/:id", auth, handleLikes);
storiesRouter.post("/remove", auth, removeStory);

module.exports = storiesRouter;
