const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verify error:", err.message);
      return res.status(401).json({ success: false, message: "Session expired. Please login again" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("User  Authentication Error:", error);
    res.status(500).json({ success: false, message: error?.message || "Authentication error" });
  }
};

module.exports = authUser;
