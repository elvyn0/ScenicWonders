const cloudinary = require("cloudinary").v2;
const blogModel = require("../models/blogModel");

// finction to add
const addBlog = async (req, res) => {
  try {
    const { userId } = req.body;
    const { title, content } = req.body;

    if (!title || content) {
      res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const blogData = {
      user: userId,
      title,
      content,
      like: 0,
    };
    const blog = new blogModel(blogData);
    await blog.save();

    res.json({ success: true, message: "Blog post added successfully", blogId: blog._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for list blog

const listBlog = async () => {
  try {
    const blogs = (await blogModel.find({})).toSorted({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// function for remove blog

const removeBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.body;

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    if (blog.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delte this post" });
    }

    await blogModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog post deleted sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// function for get single blog

const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!lblog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// update blog

const updateBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.body;

    const { title, content } = req.body;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ status: false, messaage: "Blog post not found for update." });
    }

    if (blog.user.toString() !== userId.toString) {
      return res.status(403).json({ success: false, messaage: "Not authorized to update this post." });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: "No fields provided for update." });
    }

    // perform the update

    const updatedBlog = await blogModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    res.status(200).json({ success: true, messaage: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, messaage: error.messaage });
  }
};

module.exports = { addBlog, listBlog, removeBlog, singleBlog, updateBlog };
