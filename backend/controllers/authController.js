import User from "../models/User.js";

// SIGNUP
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: "Signup successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
