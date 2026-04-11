const Hotel = require("../models/hotelModel");
const Booking = require("../models/bookingModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;

// Admin: Create / add hotel
const createHotel = async (req, res) => {
  try {
    const { name, description, pricePerNight, totalRooms, location, weekendDeals } = req.body;

    const hotelImage = req.files?.hotelImage?.[0];
    const roomImage1 = req.files?.roomImage1?.[0];
    const roomImage2 = req.files?.roomImage2?.[0];

    if (!hotelImage) {
      return res.status(400).json({ success: false, message: "Hotel image is required" });
    }

    const images = [hotelImage, roomImage1, roomImage2].filter(Boolean);

    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        let result = await cloudinary.uploader.upload(file.path, {
          folder: "hotels",
          quality: "auto",
          fetch_format: "auto",
        });
        await fs.unlink(file.path);

        return {
          url: result.secure_url,
          publicId: result.public_id,
        };
      }),
    );

    const price = Number(pricePerNight);
    if (isNaN(price)) {
      return res.status(400).json({ message: "Invalid pricePerNight" });
    }

    const hotelData = {
      name,
      description,
      pricePerNight: price,
      totalRooms: Number(totalRooms),
      location,
      weekendDeals: weekendDeals === "true" ? true : false,
      hotelImage: uploadedImages[0],
      roomImages: uploadedImages.slice(1),
    };

    await Hotel.create(hotelData);

    res.status(201).json({ success: true, message: "Hotel added successfully" });
  } catch (error) {
    console.error("Create Hotel Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all hotels
const listAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    console.error("Error fetching all hotels:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch hotels" });
  }
};

// Get hotel deatiles
const getHotelDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error("Error fetching hotel details:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch hotel details" });
  }
};

// Hotel search
const searchHotel = async (req, res) => {
  try {
    const { location, checkIn, checkOut, rooms } = req.query;

    if (!location || !checkIn || !checkOut) {
      return res.status(400).json({ success: false, message: "Location and Dates are required" });
    }

    const hotels = await Hotel.find({
      location: { $regex: location, $options: "i" },
    });

    const availableHotels = [];

    for (let hotel of hotels) {
      const overlappingBookings = await Booking.find({
        hotel: hotel._id,
        bookingStatus: { $in: ["pending", "confirmed"] },
        checkInDate: { $lt: new Date(checkOut) },
        checkOutDate: { $gt: new Date(checkIn) },
      });

      const bookedRooms = overlappingBookings.reduce((sum, booking) => sum + booking.numberOfRooms, 0);

      const availableRooms = hotel.totalRooms - bookedRooms;

      if (availableRooms >= (rooms || 1)) {
        availableHotels.push({
          ...hotel.toObject(),
          availableRooms,
        });
      }
    }
    res.status(200).json({ success: true, hotels: availableHotels });
  } catch (error) {
    console.error("Hotel Search Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: delete hotel
const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    // Deleting hotelImage form cloudinary
    if (hotel.hotelImage?.publicId) {
      await cloudinary.uploader.destroy(hotel.hotelImage.publicId);
    }
    // Deleting roomsImage form cloudinary {Arry}
    if (hotel.roomImages && hotel.roomImages.length > 0) {
      await Promise.all(hotel.roomImages.map((img) => cloudinary.uploader.destroy(img.publicId)));
    }

    await Hotel.findByIdAndDelete(hotelId);

    res.status(200).json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Hotel Delete Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createHotel, listAllHotels, getHotelDetails, deleteHotel, searchHotel };
