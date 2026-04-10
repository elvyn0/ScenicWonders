const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        updatedAt: true,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model("ConversationModel", conversationSchema);
