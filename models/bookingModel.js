const mongoose = require("mongoose");

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User Model
   ref: "userCollections", // Reference to the userCollection
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Product Model
       ref: "productCollections", // Reference to the productCollection
        required: true,
      },
      quantity: {
        type: Number,
        required: true, // Quantity of the product being purchased
      },
    },
  ],
  bookingDate: {
    type: Date,
    default: Date.now, // Date of booking
  },
  totalAmount: {
    type: Number,
    required: true, // Total amount for all products in the booking
  },
});

// Create a model based on the schema
const bookingModel = mongoose.model("bookingCollection", bookingSchema);

// Export the model
module.exports = {
  bookingModel,
};
