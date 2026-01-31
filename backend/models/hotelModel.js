const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String },
  hotelImage: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },

  roomImages: [
    {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  ],
  totalRooms: { type: Number, required: true },
  rating: { type: Number, default: 4.0 },
  weekendDeals: { type: Boolean },
});

module.exports = mongoose.model("Hotel", hotelSchema);
