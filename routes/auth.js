require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import User model

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with a secure secret key
console.log("🚀 ~ jwtSecret:", jwtSecret)

// Route: POST /auth/signup - Register a new user
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Route: POST /auth/login - Authenticate user and generate JWT token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
