const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { url: { type: String, required: true }, publicId: { type: String, required: true } },
    caption: { type: String },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Post", postSchema);
