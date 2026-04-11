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
    console.error("Add post Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Function for list post
const listPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", " name profilePic").sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("List post Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Deatile post view
const singlePost = async (req, res) => {
  try {
    const userId = req.user?._id;
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("user", "name profilePic"); //

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    let liked = false;
    if (userId) {
      liked = post.likes.some((likedId) => likedId.toString() === userId.toString());
    }
    res.status(200).json({
      success: true,
      post: {
        ...post._doc,
        liked,
      },
    });
  } catch (error) {
    console.error("Deatile post Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Handling likes
const handleLike = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(404).json({ success: false, message: "userId didn't reached at backend" });
    }

    if (!id) {
      return res.status(404).json({ success: false, message: "Post id not received" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
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
    console.error("Handling Like Error:".error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for remove post
const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Authorization check //
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized " });
    }

    if (post.image?.publicId) {
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addPost, listPost, singlePost, handleLike, removePost };
