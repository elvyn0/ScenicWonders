const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");

/// User ///
//  create booking

const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { hotelId, checkInDate, checkOutDate, numberOfRooms, numberOfGuest } = req.body;

    if (!hotelId || !checkInDate || !checkOutDate || !numberOfRooms) {
      return res.status(400).json({ success: false, message: "Misssing required booking deatiles" });
    }

    //Date validation
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({ success: false, message: "check-Out date must be after check-In date" });
    }

    // fetch hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ success: false, message: "Hotel not found" });
    }

    // Availability checking
    const overLappingBookings = await Booking.find({
      hotel: hotelId,
      bookingStatus: { $in: ["Pending", "Confirmed"] },
      checkInDate: { $lt: checkIn },
      checkOutDate: { $gt: checkOut },
    });

    const bookedRooms = overLappingBookings.reduce((sum, booking) => sum + booking.numberOfRooms, 0);

    const availableRooms = hotel.totalRooms - bookedRooms;

    if (availableRooms < numberOfRooms) {
      return res.status(406).json({ success: true, message: "Not enough are available" });
    }

    // Calculate nights and price
    const nights = Math.ceil((checkIn - checkOut) / (1000 * 60 * 60 * 24));

    const totalPrice = nights * hotel.pricePerNight * numberOfRooms;

    // Create booking
    const booking = await Booking.create({
      user: userId,
      hotel: hotelId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfRooms,
      numberOfGuest,
      totalPrice,
      bookingStatus: "Pending",
    });

    // Respond to frontend

    res.status(201).json({
      success: true,
      message: "Booking created proceed to payment",
      bookingId: booking._id,
      totalPrice,
      bookingStatus: booking.bookingStatus,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ success: false, message: "Server  error while creating a booking" });
  }
};

// To list all  user bookings

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const myBookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("hotel", "name image location pricePerNight ");

    res.status(200).json({ success: true, myBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get a perticular booking deatiles

const getBookingById = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({ _id: bookingId, user: userId }).populate("hotel");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking

const cancelBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({ _id: bookingId, user: userId });

    if (!booking) {
      return res.status(400).json({ success: false, message: "Booking not found" });
    }

    if (booking.bookingStatus === "Completed") {
      return res.status(400).json({ success: false, messsage: "Completed bookings cannot be Cancel" });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({ success: false, message: "This booking already cancelled" });
    }

    booking.bookingStatus === "Cancelled";
    await booking.save();

    res.status(200).json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/// Admin ///

// Get bookings deatiles

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("hotel", "name destination")
      .sort({ createdAt: -1 });
    res.status().json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get ful view for admin

const getAdminStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only access" });
    }

    const [totalUsers, totalBookings, totalPrice, revenue] = await Promise.all([
      User.countDocuments(),
      Hotel.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "totalPrice" } } },
      ]),
    ]);

    res
      .status(200)
      .json({ success: true, totalBookings, totalUsers, totalPrice, totalRevenue: revenue[0]?.total || 0 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// To Delete bookings

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    await booking.deleteOne();

    res.status(200).json({ success: true, message: "Booking deleted " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  deleteBooking,
  getAdminStatus,
};
