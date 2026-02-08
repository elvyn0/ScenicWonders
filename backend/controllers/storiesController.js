const cloudinary = require("cloudinary").v2;
const Stories = require("../models/storiesModel");

// finction to add
const addStory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const stories = await Stories.create({
      user: userId,
      title,
      content,
      like: 0,
    });

    res.json({ success: true, message: "Stories post added successfully", stories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for list stories

const listStories = async (req, res) => {
  try {
    const stories = await Stories.find().populate("user", "name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, stories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for remove stories

const removeStory = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.body;

    const story = await Stories.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, message: "Story post not found" });
    }
    if (story.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delte this post" });
    }

    await Stories.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Story post deleted sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// function for get single story

const singleStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Stories.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, message: "Story post not found" });
    }
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// update story

const updateStory = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.body;

    const { title, content } = req.body;

    const story = await Stories.findById(id);

    if (!story) {
      return res.status(404).json({ status: false, messaage: "Story post not found for update." });
    }

    if (story.user.toString() !== userId.toString) {
      return res.status(403).json({ success: false, messaage: "Not authorized to update this post." });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: "No fields provided for update." });
    }

    // perform the update

    const updatedStory = await Stories.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    res.status(200).json({ success: true, messaage: "story post updated successfully", story: updatedStory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, messaage: error.messaage });
  }
};

module.exports = { addStory, listStories, removeStory, singleStory, updateStory };
