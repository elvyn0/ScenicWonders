const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authUser = async (req, res, next) => {
  try {
    // Support both `Authorization: Bearer <token>` and `Authorization: <token>`
    const authHeader = req.headers.authorization || req.headers.token;
    let token;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verify error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message || "Authentication error" });
  }
};

module.exports = authUser;
