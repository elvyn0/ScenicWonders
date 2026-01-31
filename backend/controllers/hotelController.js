const Hotel = require("../models/hotelModel");
const Booking = require("../models/bookingModel");
const cloudinary = require("cloudinary").v2;

// Admin: Create / add hotel
const createHotel = async (req, res) => {
  try {
    const { name, description, pricePerNight, totalRooms, location, weekendDeals } = req.body;

    const hotelImage = req.files?.hotelImage?.[0];
    const roomImage1 = req.files?.roomImage1?.[0];
    const roomImage2 = req.files?.roomImage2?.[0];

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log(req.headers["content-type"]);

    if (!hotelImage) {
      return res.status(400).json({ success: false, message: "Hotel image is required" });
    }

    const images = [hotelImage, roomImage1, roomImage2].filter(Boolean);

    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        let result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          folder: "hotels",
        });
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
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

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

// Admin: delete hotel

const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    if (hotel.image?.length) {
      await Promise.all(hotel.image.map((img) => (img.publicId ? cloudinary.uploader.destroy(img.publicId) : null)));
    }
    await Hotel.findByIdAndDelete(hotelId);

    res.status(200).json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createHotel, listAllHotels, getHotelDetails, deleteHotel };
