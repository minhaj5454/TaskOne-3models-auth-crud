const { signupUser, loginUser } = require("../services/userService");

const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await signupUser(username, email, password);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
