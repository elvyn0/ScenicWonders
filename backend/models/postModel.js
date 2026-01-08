const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    image: { url: { type: String, required: true }, publicId: { type: String, required: true } },
    caption: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("post", postSchema);
