const Stories = require("../models/storiesModel");

// Finction to add
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

    res.json({ success: true, message: "Your story posted successfully", stories });
  } catch (error) {
    console.error("Create Story Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for list stories
const listStories = async (req, res) => {
  try {
    const userId = req.user?._id;

    const stories = await Stories.find().populate("user", "name profilePic").sort({ createdAt: -1 });

    const updatedStories = stories.map((s) => {
      let liked = false;

      if (userId) {
        liked = s.likes.some((likedId) => likedId.toString() === userId.toString());
      }

      return {
        ...s._doc,
        likes: s.likes,
        liked,
      };
    });

    res.status(200).json({
      success: true,
      stories: updatedStories,
    });
  } catch (error) {
    console.error("Story listing Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for get single story
const singleStory = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const story = await Stories.findById(id).populate("user", "name profilePic");

    if (!story) {
      return res.status(404).json({ success: false, message: "Story  not found" });
    }

    let liked = false;
    if (userId) {
      liked = story.likes.some((likedId) => likedId.toString() === userId.toString());
    }

    res.status(200).json({
      success: true,
      story: {
        ...story._doc,
        liked,
      },
    });
  } catch (error) {
    console.error("Deatil Story Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Likes
const handleLikes = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(404).json({ success: false, messaage: "User not found" });
    }

    const story = await Stories.findById(id);

    if (!story) {
      return res.status(404).json({ success: false, messaage: "Story not found" });
    }

    const alreadyLiked = story.likes.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      story.likes = story.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // LIKE
      story.likes.push(userId);
    }

    await story.save();

    res.status(200).json({ success: true, likes: story.likes, liked: !alreadyLiked });
  } catch (error) {
    console.error("Handling Likes Error:", error);
    res.status(500).json({ success: false, message: error.messaage });
  }
};

// Function for remove stories
const removeStory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const story = await Stories.findById(id);

    if (!story) {
      return res.status(404).json({ success: false, message: "Story  not found" });
    }
    if (story.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete" });
    }

    await Stories.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Story  deleted sucessfully" });
  } catch (error) {
    console.error("Delete Story Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addStory, listStories, singleStory, handleLikes, removeStory };
