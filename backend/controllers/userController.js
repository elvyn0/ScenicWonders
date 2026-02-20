const validator = require("validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");
const Stories = require("../models/storiesModel");
const ConversationModel = require("../models/Conversation");
const MessageModel = require("../models/Message");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// User registration //

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user already exist or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "This email is already exist", error_code: "EMAIL_CONFLICT" });
    }

    // Validating email

    if (!validator.isEmail(email)) {
      return res
        .status(406)
        .json({ success: false, message: "Please enter a valid Email", error_code: "INVALID_EMAIL" });
    }

    // checking password is strong or not
    if (password.length < 8) {
      return res.status(412).json({ success: false, message: "Please enter a strong password" });
    }

    //encripting and hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating a new user

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user Login //
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get logged user
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// To get all Users //

const getUsersList = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select(" profilePic name");

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  To get user ///
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// user Profile //
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const [user, posts, stories] = await Promise.all([
      User.findById(userId).select("-password"),
      Post.find({ user: userId }).sort({ createdAt: -1 }),
      Stories.find({ user: userId }).sort({ createdAt: -1 }),
    ]);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
      posts,
      stories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

///  Admin Login ///
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ success: false, message: "Email and password are required" });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, userLogin, getUser, adminLogin, getUserProfile, getMe, getUsersList };
