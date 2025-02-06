const { bookingModel } = require("../models/bookingModel");
const { productModel } = require("../models/productModel"); // Import product model

// Create Booking
const createBooking = async (userId, products, bookingDate) => {
  try {
    // Calculate totalAmount dynamically from the products and their quantities
    let totalAmount = 0;
    for (const product of products) {
      const productDoc = await productModel.findById(product.product);
      if (!productDoc) {
        throw new Error(`Product with ID ${product.product} not found.`);
      }
      totalAmount += productDoc.price * product.quantity;  // Calculate the total price
    }

    // Create the booking with the calculated totalAmount
    const newBooking = await bookingModel.create({
      user: userId,
      products,
      bookingDate,
      totalAmount
    });
    return newBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Bookings
const getAllBookings = async () => {
  try {
    const bookings = await bookingModel.find().find().populate("user products.product")
    
    // aggregate([
    //   {
    //     $lookup: {
    //       from: "usercollections", 
    //       localField: "user", 
    //       foreignField: "_id", 
    //       as: "userDetails", 
    //     }
    //   },
    //   {
    //     $unwind: {
    //       path: "$userDetails",
    //       preserveNullAndEmptyArrays: true 
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "productcollections", 
    //       localField: "products.product",
    //       foreignField: "_id", 
    //       as: "productDetails",
    //     }
    //   },
    //   // {
    //   //   $unwind: {
    //   //     path: "$productDetails",
    //   //     preserveNullAndEmptyArrays: true 
    //   //   }
    //   // },
    //   // {
    //   //   $project:{
    //   //     '_id':1,
    //   //     'userDetails': 0,
    //   //     'productDetails':0,
    //   //     'products':0,
    //   //    // 'customerName': '$userDetails.username'

    //   //   }
    //   // }
    // ]);

    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};



// Get Booking by ID
const getBookingById = async (id) => {
  try {
    const booking = await bookingModel.findById(id).populate("user products.product");
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Booking
const updateBooking = async (id, userId, products, bookingDate) => {
  try {
    // Calculate totalAmount dynamically from the products and their quantities
    let totalAmount = 0;
    for (const product of products) {
      const productDoc = await productModel.findById(product.product);
      if (!productDoc) {
        throw new Error(`Product with ID ${product.product} not found.`);
      }
      totalAmount += productDoc.price * product.quantity;  // Calculate the total price
    }

    // Update the booking with the new details and calculated totalAmount
    const updatedBooking = await bookingModel.findByIdAndUpdate(
      id,
      { user: userId, products, bookingDate, totalAmount },
      { new: true }
    );
    if (!updatedBooking) {
      throw new Error("Booking not found");
    }
    return updatedBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Booking
const deleteBooking = async (id) => {
  try {
    const deletedBooking = await bookingModel.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new Error("Booking not found");
    }
    return deletedBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
