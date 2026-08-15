import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// REGISTER
// ==========================================

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      height,
      weight,
      fitnessGoal,
    } = req.body;

    // -----------------------------
    // Validate required fields
    // -----------------------------

    if (
      !name ||
      !email ||
      !password ||
      age === undefined ||
      height === undefined ||
      weight === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // -----------------------------
    // Validate password
    // -----------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // -----------------------------
    // Normalize email
    // -----------------------------

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // -----------------------------
    // Check existing user
    // -----------------------------

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // -----------------------------
    // Validate numbers
    // -----------------------------

    const numericAge = Number(age);
    const numericHeight = Number(height);
    const numericWeight = Number(weight);

    if (
      !Number.isFinite(numericAge) ||
      !Number.isFinite(numericHeight) ||
      !Number.isFinite(numericWeight)
    ) {
      return res.status(400).json({
        success: false,
        message: "Age, height and weight must be valid numbers",
      });
    }

    // -----------------------------
    // Hash password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // -----------------------------
    // Create user
    // -----------------------------

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      age: numericAge,
      height: numericHeight,
      weight: numericWeight,
      fitnessGoal:
        fitnessGoal || "general-fitness",
    });

    // -----------------------------
    // Generate JWT
    // -----------------------------

    const token = generateToken(user._id);

    // -----------------------------
    // Response
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};