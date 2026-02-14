const cloudinary = require("cloudinary").v2;
const Post = require("../models/postModel");
const fs = require("fs").promises;

// Add post

const addPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { caption } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Post image required" });
    }

    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder: "social_media_posts",
    });

    await fs.unlink(image.path);

    const post = await Post.create({
      user: userId,
      image: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
      caption,

      time: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Post added successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// Function for list post
const listPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", " name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Function for remove post

const removePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);
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
    res.status(500).json({ success: false, message: error.message });
  }
};

//function for single product info

const singlePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("user", "name profilePic"); //

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
