const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, ref: "Hotel", required: true },
    location: { type: String, ref: "Hotel", required: true },

    hotelImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },

    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.checkInDate;
        },
        message: "Check-out date must be after check-in date.",
      },
    },
    numberOfRooms: {
      type: Number,
      default: 1,
      min: 1,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
