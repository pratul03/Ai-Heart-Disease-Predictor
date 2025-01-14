import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";

dotenv.config();

// Default avatar URLs (uploaded to Cloudinary)
const defaultAvatars = [
  "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar4_hxwper.png",
  "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar3_h74xpz.png",
  "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar1_dhmaws.png",
  "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar2_rgwwyy.png",
];

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "5h" });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Handle avatar upload
    let avatarUrl = "";
    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url; // Use the Cloudinary URL
    } else {
      // Assign a random default avatar from Cloudinary
      const randomAvatar =
        defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
      avatarUrl = randomAvatar;
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
      avatar: avatarUrl, // Save the Cloudinary URL
    });

    await newUser.save();
    console.log(newUser);

    // Generate JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Compare password
    // Compare password explicitly
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log(password, user.password, isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userId = req.user.userId; // Extracted from the JWT token
    const targetUserId = req.params.userId; // User ID from the request params

    // Ensure the authenticated user is updating their own data
    if (userId !== targetUserId) {
      return res.status(403).json({
        message: "You are not authorized to update this user's data.",
      });
    }

    // Find the user by ID
    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Update avatar if a new file is uploaded
    if (req.file) {
      // Upload new avatar to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      user.avatar = result.secure_url; // Update the avatar URL
    }

    // Save the updated user
    await user.save();

    // Generate a new JWT token (optional, if you want to refresh the token)
    const token = generateToken(user._id);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
