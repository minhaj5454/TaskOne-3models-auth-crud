const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

// Hash password function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword;
};

// Compare password function
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword); // Compare plain password with hashed password
};

// Signup function
const signupUser = async (username, email, password) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

// Login function
const loginUser = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, "your_jwt_secret_key", { expiresIn: "1h" });

  return { token, user };
};

module.exports = {
  signupUser,
  loginUser,
};
