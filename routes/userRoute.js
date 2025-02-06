const express = require("express");
const { userSignup, userLogin } = require("../controllers/userController");
const route = express.Router();

// Signup Route
route.post("/signup", userSignup);

// Login Route
route.post("/login", userLogin);

module.exports = route;
