const express = require("express");
const {
  createHotel,
  listAllHotels,
  getHotelDetails,
  checkHotelAvailability,
  deleteHotel,
} = require("../controllers/hotelController");
const upload = require("../middlewares/multer");
const adminAuth = require("../middlewares/adminAuth");

const hotelRouter = express.Router();

hotelRouter.post(
  "/create",
  adminAuth,
  upload.fields([
    { name: "hotelImage", maxCount: 1 },
    { name: "roomImage1", maxCount: 1 },
    { name: "roomImage2", maxCount: 1 },
  ]),
  createHotel,
);

hotelRouter.get("/list", listAllHotels);
hotelRouter.get("/:id", getHotelDetails);
hotelRouter.delete("/delete/:id", adminAuth, deleteHotel);
hotelRouter.get("/:hotelId/availability", checkHotelAvailability);

module.exports = hotelRouter;
