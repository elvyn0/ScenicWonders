const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true }, // the travel storys
    likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
