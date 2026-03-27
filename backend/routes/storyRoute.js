const express = require("express");
const { addStory, listStories, removeStory, singleStory } = require("../controllers/storiesController");
const auth = require("../middlewares/auth");

const storiesRouter = express.Router();

// PROTECTED ROUTES
storiesRouter.post("/add", auth, addStory);
storiesRouter.post("/remove", auth, removeStory);

// PUBLIC ROUTES (Anyone can view)

storiesRouter.get("/list", listStories);
storiesRouter.get("/:id", singleStory);

module.exports = storiesRouter;
