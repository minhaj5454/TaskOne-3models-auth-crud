const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
  } = require("../services/bookingService");
  
  // Create a new booking
  const createBookingController = async (req, res) => {
    try {
      const { userId, products, bookingDate } = req.body;
      const newBooking = await createBooking(userId, products, bookingDate);
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all bookings
  const getAllBookingsController = async (req, res) => {
    try {
      const bookings = await getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single booking by ID
  const getBookingByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      res.status(200).json(booking);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Update a booking
  const updateBookingController = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, products, bookingDate } = req.body;
      const updatedBooking = await updateBooking(id, userId, products, bookingDate);
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a booking
  const deleteBookingController = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBooking = await deleteBooking(id);
      res.status(200).json(deletedBooking);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  module.exports = {
    createBookingController,
    getAllBookingsController,
    getBookingByIdController,
    updateBookingController,
    deleteBookingController,
  };