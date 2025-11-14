const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "postMedia");

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    callback(null, uniqueName);
  },

  filename: function (req, file, callback) {
    const extension = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + req.body.userId + extension;
    callback(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
