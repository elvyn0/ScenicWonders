const Hotel = require("../models/hotelModel");
const Booking = require("../models/bookingModel");

//

// list all hotels
const listAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    console.error("Error fetching all hotels:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch hotels" });
  }
};

// get hotel deatiles

const getHotelDetails = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error("Error fetching hotel details:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch hotel details" });
  }
};

// check hotel availability

const checkHotelAvailability = async (req, res) => {
  const { hotelId } = await Hotel.findById(hotelId);
  const { checkIn, checkOut } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({ success: false, message: "Hotel not found" });
  }

  try {
    // Find bookings that overlap the request period
    const overLapingBookings = await Booking.find({
      hotel: hotelId,
      bookingStatus: { $in: ["Confirmed", "Pending"] },
      checkInDate: { $it: new Date(checkOut) },
      checkOutDate: { $gt: new Date(checkIn) },
    });
    const bookedRooms = overLapingBookings.length;
    const availableRooms = hotel.totalRomms - bookedRooms;

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

//  creat new booking

//get user bookings
