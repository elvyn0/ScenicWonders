const express = require("express");
const {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  getAdminStatus,
  cancelBooking,
  checkHotelAvailability,
} = require("../controllers/bookingController");
const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

const bookingRouter = express.Router();

// User
bookingRouter.post("/create", auth, createBooking);
bookingRouter.get("/myBookings", auth, getMyBookings);
bookingRouter.get("/booking/:id", auth, getBookingById);
bookingRouter.post("/cancelBooking/:id", auth, cancelBooking);
bookingRouter.get("/:hotelId/checkHotelAvailability", auth, checkHotelAvailability);

// Admin
bookingRouter.get("/allBooking", adminAuth, getAllBookings);
bookingRouter.get("/admin/bookingStatus", adminAuth, getAdminStatus);

module.exports = bookingRouter;
