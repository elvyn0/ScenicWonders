const express = require("express");
const {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  getAdminStatus,
  deleteBooking,
  cancelBooking,
} = require("../controllers/bookingController");
const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

const bookingRouter = express.Router();

// User
bookingRouter.post("/create", auth, createBooking);
bookingRouter.get("/myBookings", auth, getMyBookings);
bookingRouter.get("/booking/:id", auth, getBookingById);
bookingRouter.post("/cancelBooking/:id", auth, cancelBooking);

// Admin
bookingRouter.get("/admin/allBooking", adminAuth, getAllBookings);
bookingRouter.get("/dmin/bookingStatus", adminAuth, getAdminStatus);
bookingRouter.delete("/admin/deleteBooking/:id", adminAuth, deleteBooking);

module.exports = bookingRouter;
