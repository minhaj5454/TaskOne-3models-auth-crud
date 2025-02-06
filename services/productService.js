const { productModel } = require("../models/productModel");  // Destructure productModel from the object

// Create Product
const createProduct = async (productName, price, category, stock) => {
  try {
    const newProduct = await productModel.create({
      productName,
      price,
      category,
      stock,
    });
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Products with Pagination
const getAllProducts = async (skip, limit) => {
  try {
    // Log the skip and limit to check the values
    console.log(`skip: ${skip}, limit: ${limit}`);

    // Ensure that skip and limit are valid numbers
    if (isNaN(skip) || isNaN(limit)) {
      throw new Error('Invalid pagination parameters');
    }

    const products = await productModel.find().skip(skip).limit(limit);

    // Log the result to check if products are being fetched correctly
    console.log('Fetched products:', products);

    return products;
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    throw new Error(error.message);
  }
};

// Get Single Product by ID
const getProductById = async (id) => {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Product
const updateProduct = async (id, productName, price, category, stock) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { productName, price, category, stock },
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Product
const deleteProduct = async (id) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
