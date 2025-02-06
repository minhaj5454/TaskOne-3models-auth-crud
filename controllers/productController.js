const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  } = require("../services/productService");
  
  const { productModel } = require("../models/productModel");  // Fix: Importing productModel
  
  // Create Product
  const createProductController = async (req, res) => {
    try {
      const { productName, price, category, stock } = req.body;
      const newProduct = await createProduct(productName, price, category, stock);
      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get All Products with Pagination
  const getAllProductsController = async (req, res) => {
    try {
      // Extract pagination parameters from query
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
  
      // Ensure skip and limit are valid
      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return res.status(400).json({ error: "Invalid pagination parameters" });
      }
  
      // Calculate skip value for pagination
      const skip = (page - 1) * limit;
  
      // Log for debugging
      console.log(`Pagination - page: ${page}, limit: ${limit}, skip: ${skip}`);
  
      // Fetch products with pagination
      const products = await getAllProducts(skip, limit);
  
      // Get the total number of products to calculate total pages
      const totalProducts = await productModel.countDocuments();  // Fix: Using productModel for countDocuments
      const totalPages = Math.ceil(totalProducts / limit);
  
      // Log the total number of products and total pages
      console.log(`Total products: ${totalProducts}, Total pages: ${totalPages}`);
  
      // Send response with paginated data
      res.status(200).json({
        products,
        totalProducts,
        totalPages,
        currentPage: page,
        limit,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get Single Product by ID
  const getProductByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await getProductById(id);
      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Update Product
  const updateProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const { productName, price, category, stock } = req.body;
  
      const updatedProduct = await updateProduct(id, productName, price, category, stock);
  
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete Product
  const deleteProductController = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteProduct(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
  };
  