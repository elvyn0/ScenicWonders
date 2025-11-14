const cloudinary = require("cloudinary").v2;
const postModel = require("../models/postModel");
const fs = require("fs").promises;

// Add post

const addPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { caption } = req.body;

    const imageFiles = req.files && req.files.image;

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "A post image is required." });
    }

    const imageUrls = await Promise.all(
      imageFiles.map(async (item) => {
        try {
          let result = await cloudinary.uploader.upload(item.path, {
            folder: "social_media_posts",
            resource_type: "image",
          });

          return result.secure_url;
        } finally {
          await fs.unlink(item.path);
        }
      })
    );

    const postData = {
      user: userId,
      image: imageUrls[0],
      caption,
      likes: 0,
      time: Date.now(),
    };
    const post = new postModel(postData);
    await post.save();

    res.status(201).json({ success: true, message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// Function for list post
const listPost = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .sort({ time: -1 }) // sort by newest first
      .populate("user", "username profilePicture");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Function for remove post

const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    //Authorization check: only the author can delete their post
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this post." });
    }

    // perform deletion
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//function for single product info

const singlePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id).populate("user", "username profilePicture"); //

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPost, listPost, removePost, singlePost };
