require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with a secure secret key

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// User Model
const User = require("./models/user"); // Define User model, assuming you have created this model

// Routes
const todoRouter = require("./routes/todo");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("🚀 ~ verifyToken ~ error:", error)
    res.status(400).json({ message: "Token is not valid" });
  }
};

app.use("/todos", verifyToken, todoRouter); // Apply middleware to '/todos' route
app.use("/users", verifyToken, userRouter); // Apply middleware to '/users' route
app.use("/auth", authRouter); // Authentication routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
