import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming you have a User model


export const registerUser = async (req, res) => {
    const { name, userID, email, password } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Store the password directly without hashing
      const user = await User.create({ name, userID, email, password });
  
      if (user) {
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Direct comparison without bcrypt
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      req.session.user = { id: user._id, email: user.email, name: user.name };
  
      res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };  
  

// Logout User
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// Get User Profile (Protected Route)
export const getUserProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ user: req.session.user });
};

