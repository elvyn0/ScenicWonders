const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getAdminStatus,
  cancelBooking,
  checkHotelAvailability,
  deleteBooking,
} = require("../controllers/bookingController");
const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

const bookingRouter = express.Router();

// Admin
bookingRouter.get("/allBooking", adminAuth, getAllBookings);
bookingRouter.get("/admin/bookingStatus", adminAuth, getAdminStatus);

// User
bookingRouter.post("/create", auth, createBooking);
bookingRouter.get("/myBookings", auth, getMyBookings);
bookingRouter.patch("/cancelBooking/:id", auth, cancelBooking);
bookingRouter.get("/:hotelId/checkHotelAvailability", auth, checkHotelAvailability);
bookingRouter.delete("/delete-booking/:id", auth, deleteBooking);

module.exports = bookingRouter;
