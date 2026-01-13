const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      role,
    });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        error: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`,
      });
    }
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.trim() });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isMatch = await user.comparePassword(password.trim());
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
