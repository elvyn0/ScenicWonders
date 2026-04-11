const express = require("express");
const { addStory, listStories, removeStory, singleStory, handleLikes } = require("../controllers/storiesController");
const auth = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");

const storiesRouter = express.Router();

// PUBLIC ROUTES
storiesRouter.get("/list", listStories);
storiesRouter.get("/:id", optionalAuth, singleStory);

// PROTECTED ROUTES
storiesRouter.post("/add", auth, addStory);
storiesRouter.post("/like/:id", auth, handleLikes);
storiesRouter.delete("/remove/:id", auth, removeStory);

module.exports = storiesRouter;
