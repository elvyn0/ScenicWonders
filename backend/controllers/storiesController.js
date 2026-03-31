const cloudinary = require("cloudinary").v2;
const Stories = require("../models/storiesModel");

// Finction to add //
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

// Function for list stories //
const listStories = async (req, res) => {
  try {
    const userId = req.user?._id; // safe

    const stories = await Stories.find().populate("user", "name").sort({ createdAt: -1 });

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
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for remove stories //

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

// Function for get single story //

const singleStory = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const story = await Stories.findById(id).populate("user", "name profilePic");

    if (!story) {
      return res.status(404).json({ success: false, message: "Story post not found" });
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Likes //
const handleLikes = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(404).json({ success: false, messaage: "User not found" });
    }

    const post = await Stories.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, messaage: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // LIKE
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({ success: true, likes: post.likes, liked: !alreadyLiked });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, messaage: error.messaage });
  }
};

module.exports = { addStory, listStories, removeStory, singleStory, handleLikes };
