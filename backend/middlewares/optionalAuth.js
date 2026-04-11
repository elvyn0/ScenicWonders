const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token;
    let token;

    if (!authHeader) {
      req.user = null;
      return next();
    }

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      req.user = user || null;
    } catch (error) {
      req.user == null;
    }
    next();
  } catch (error) {
    console.error("OptionalAuth Error:", error);
    ret.user = null;
    next();
  }
};

module.exports = optionalAuth;
