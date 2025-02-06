const express = require("express");
const {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");

const route = express.Router();

// Create a product
route.post("/create", createProductController);

// Get all products
route.get("/", getAllProductsController);

// Get a single product by ID
route.get("/:id", getProductByIdController);

// Update a product by ID
route.put("/:id", updateProductController);

// Delete a product by ID
route.delete("/:id", deleteProductController);

module.exports = route;
