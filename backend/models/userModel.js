const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual("totalBookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "user",
  count: true,
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = userModel;
