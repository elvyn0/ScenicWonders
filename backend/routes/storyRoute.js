const express = require("express");
const { addStory, listStories, removeStory, singleStory, handleLikes } = require("../controllers/storiesController");
const auth = require("../middlewares/auth");

const storiesRouter = express.Router();

// PROTECTED ROUTES
storiesRouter.post("/add", auth, addStory);
storiesRouter.post("/remove", auth, removeStory);
storiesRouter.post("/like/:id", auth, handleLikes);

// PUBLIC ROUTES (Anyone can view)

storiesRouter.get("/list", listStories);
storiesRouter.get("/:id", singleStory);

module.exports = storiesRouter;
