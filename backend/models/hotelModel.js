const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  totalRooms: { type: Number, required: true },
  amenities: [String],
  rating: { type: Number, default: 4.0 },
});

module.exports = mongoose.model("Hotel", hotelSchema);
