const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model("productCollections", productSchema);

// Export the model
module.exports = { productModel };  // Make sure to export it as an object
