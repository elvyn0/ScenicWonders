const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");

/// User ///
//  create booking

const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;

    const { hotelId, numberOfRooms, numberOfGuests, checkInDate, checkOutDate, firstName, lastName, email } = req.body;
    console.log(hotelId, numberOfRooms, numberOfGuests, checkInDate, checkOutDate, firstName, lastName, email);

    if (
      !hotelId ||
      !checkInDate ||
      !checkOutDate ||
      !numberOfGuests ||
      !numberOfRooms ||
      !firstName ||
      !lastName ||
      !email
    ) {
      return res.status(400).json({ success: false, message: "Misssing required booking deatiles" });
    }

    //Date validation
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({ success: false, message: "check-Out date must be after check-In date" });
    }

    // fetch hotel

    const hotel = await Hotel.findById(hotelId).select(" name location pricePerNight  hotelImage ");

    if (!hotel) {
      return res.status(400).json({ success: false, message: "Hotel not found" });
    }

    if (!hotel.hotelImage || !hotel.hotelImage.publicId || !hotel.hotelImage.url) {
      return res.status(400).json({
        success: false,
        message: "Hotel image missing in database",
      });
    }

    // Availability checking
    const overLappingBookings = await Booking.find({
      hotel: hotelId,
      bookingStatus: { $in: ["pending", "confirmed"] },
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn },
    });

    const bookedRooms = overLappingBookings.reduce((sum, booking) => sum + booking.numberOfRooms, 0);

    const availableRooms = hotel.totalRooms - bookedRooms;

    if (availableRooms < numberOfRooms) {
      return res.status(406).json({ success: true, message: "Not enough are available" });
    }

    // Calculate nights and price
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const totalPrice = nights * hotel.pricePerNight * numberOfRooms;

    // Create booking
    const booking = await Booking.create({
      user: userId,
      hotel: hotelId,
      name: hotel.name,
      location: hotel.location,
      hotelImage: {
        publicId: hotel.hotelImage.publicId,
        url: hotel.hotelImage.url,
      },

      email,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfRooms,
      numberOfGuests,
      totalNights: nights,
      totalPrice,
      bookingStatus: "Confirmed",
    });

    // Respond to frontend

    res.status(201).json({
      success: true,
      message: "Booking created successfully ",
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
      .populate("hotel", "name hotelImage location pricePerNight ")
      .populate("user", "name");

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

    if (booking.bookingStatus === "completed") {
      return res.status(400).json({ success: false, messsage: "Completed bookings cannot be Cancel" });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({ success: false, message: "This booking already cancelled" });
    }

    booking.bookingStatus === "cancelled";
    await booking.save();

    res.status(200).json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// To check availabilty

const checkHotelAvailability = async (req, res) => {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  const { checkIn, checkOut } = req.query;

  if (!hotel) {
    return res.status(404).json({ success: false, message: "Hotel not found" });
  }

  if (!checkIn || !checkOut) {
    return res.status(400).json({ success: false, message: "Please select check-In and check-Out dates" });
  }

  try {
    // Find bookings that overlap the request period
    const overLapingBookings = await Booking.find({
      hotel: hotelId,
      bookingStatus: { $in: ["confirmed", "pending"] },
      checkInDate: { $lt: new Date(checkOut) },
      checkOutDate: { $gt: new Date(checkIn) },
    });
    const bookedRooms = overLapingBookings.reduce((sum, booking) => sum + booking.numberOfRooms, 0);
    const availableRooms = hotel.totalRooms - bookedRooms;

    res.json({
      success: true,
      available: availableRooms > 0,
      availableRooms: availableRooms,
      pricePerNight: hotel.pricePerNight,
    });
  } catch (error) {
    console.error("Availability check error", error);
    res.status(500).json({ success: false, message: "Server error during availabilty check." });
  }
};

/// Admin ///

// Get bookings deatiles

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get ful view for admin

const getAdminStatus = async (req, res) => {
  try {
    const [totalUsers, totalBookings, totalHotels, revenue] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Booking.countDocuments(),
      Hotel.countDocuments(),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "totalPrice" } } },
      ]),
    ]);

    res
      .status(200)
      .json({ success: true, totalBookings, totalUsers, totalHotels, totalRevenue: revenue[0]?.total || 0 });
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
  getAdminStatus,
  checkHotelAvailability,
};
