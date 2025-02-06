const express = require("express");
const {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} = require("../controllers/bookingController");

const route = express.Router();

// Create a booking
route.post("/create", createBookingController);

// Get all bookings
route.get("/", getAllBookingsController);

// Get a single booking by ID
route.get("/:id", getBookingByIdController);

// Update a booking by ID
route.put("/:id", updateBookingController);

// Delete a booking by ID
route.delete("/:id", deleteBookingController);

module.exports = route;
