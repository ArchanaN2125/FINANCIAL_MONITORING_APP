import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// SIGNUP
export const signupUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      name, 
      email, 
      phone,
      password: hashedPassword 
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords with hashing
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
