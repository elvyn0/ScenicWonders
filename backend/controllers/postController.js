const cloudinary = require("cloudinary").v2;
const postModel = require("../models/postModel");
const fs = require("fs").promises;

// Add post

const addPost = async (req, res) => {
  try {
    const { userId, caption } = req.body;
    const imageFiles = req.files;

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "Post image required" });
    }

    const uploadResult = await cloudinary.uploader.upload(imageFiles[0].path, {
      folder: "social_media_posts",
      resource_type: "image",
    });

    await fs.unlink(imageFiles[0].path);

    const post = await postModel.create({
      user: userId,
      image: uploadResult.secure_url,
      caption,
      likes: 0,
      time: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Post added successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// Function for list post
const listPost = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .sort({ time: -1 }) // sort by newest first
      .populate("user", "name profilePic");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Function for remove post

const removePost = async (req, res) => {
  try {
    const { postId } = req.params.id;
    const { userId } = req.user.id;

    const post = await post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    //Authorization check: only the author can delete their post
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized " });
    }

    if (post.image?.publicId) {
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    await post.deleteOne();

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
    const post = await postModel.findById(id).populate("user", "name profilePic"); //

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
