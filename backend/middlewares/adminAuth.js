const jwt = require("jsonwebtoken");

const adminAuth = async (req, res) => {
  const { token } = req.headres;

  if (!token) {
    res.status(401).json({ success: false, message: "Not Authorized Login Again" });
  }

  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!token_decode) {
    res.status(401).json({ success: false, message: "Not Authorized Login Again" });
  }
  next();
};
module.exports = adminAuth;
