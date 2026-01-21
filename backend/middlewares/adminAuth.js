const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }

    req.user = {
      _id: user._id,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = adminAuth;
