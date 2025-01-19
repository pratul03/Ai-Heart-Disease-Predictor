import mongoose from "mongoose";
import Doctor from "../model/doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import { configDotenv } from "dotenv";
configDotenv();

const secretKey = process.env.JWT_SECRET;

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Helper function to generate JWT token
const generateToken = (docId, role) => {
  return jwt.sign({ docId, role }, secretKey, {
    expiresIn: "7h",
  });
};

// Register a new doctor
export const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      age,
      gender,
      contact_info,
      fees,
      chamber,
      hospital_visits,
      qualifications,
      overall_experience,
      password,
    } = req.body;

    // Input validation
    if (
      !name ||
      !specialization ||
      !age ||
      !gender ||
      !contact_info ||
      !fees ||
      !qualifications ||
      !overall_experience ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    if (!contact_info.phone || !contact_info.email) {
      return res
        .status(400)
        .json({ message: "Phone and email are required in contact info." });
    }

    // Check if doctor already exists by email
    const existingDoctor = await Doctor.findOne({
      "contact_info.email": contact_info.email,
    });
    if (existingDoctor) {
      return res
        .status(409)
        .json({ message: "Doctor with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Upload image to Cloudinary if provided
    let imageUrl =
      "https://res.cloudinary.com/dxnodvf4b/image/upload/v1737139372/doc_mytidw.avif";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      specialization,
      age,
      gender,
      image: imageUrl,
      role: "doctor",
      contact_info,
      fees,
      chamber,
      hospital_visits,
      qualifications,
      overall_experience,
      password: hashedPassword,
    });

    await newDoctor.save();
    const token = generateToken(newDoctor._id, "doctor");

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: newDoctor,
      token,
    });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a doctor
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the doctor by email
    const doctor = await Doctor.findOne({ "contact_info.email": email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = generateToken(doctor._id, "doctor");
    res.status(200).json({ message: "Login successful", token, doctor });
  } catch (error) {
    console.error("Error logging in doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a doctor's details
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor ID" });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Handle image upload if a file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url; // Update the image URL in the updateData
    }

    // Validate the updateData against the schema
    const allowedUpdates = Object.keys(Doctor.schema.paths);
    const isValidUpdate = Object.keys(updateData).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid update fields" });
    }

    // Validate nested objects and arrays
    if (updateData.contact_info?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.contact_info.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    }

    if (updateData.chamber?.chamber_availability) {
      for (const availability of updateData.chamber.chamber_availability) {
        if (
          !["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(
            availability.day
          )
        ) {
          return res
            .status(400)
            .json({ message: "Invalid day in chamber availability" });
        }
      }
    }

    if (updateData.hospital_visits) {
      for (const visit of updateData.hospital_visits) {
        if (visit.days) {
          for (const day of visit.days) {
            if (
              !["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(day)
            ) {
              return res
                .status(400)
                .json({ message: "Invalid day in hospital visits" });
            }
          }
        }
      }
    }

    if (updateData.qualifications) {
      for (const qualification of updateData.qualifications) {
        if (
          !qualification.degree ||
          !qualification.college ||
          !qualification.university ||
          !qualification.start_year ||
          !qualification.end_year
        ) {
          return res
            .status(400)
            .json({ message: "Invalid qualification data" });
        }
      }
    }

    // Hash the password if it's being updated
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    // Perform the update
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensures Mongoose validators are run
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor ID." });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// View appointments for a doctor
export const viewAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor ID." });
    }

    // Find the doctor and populate the appointments
    const doctor = await Doctor.findById(id).populate("appointments");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    res.status(200).json({ appointments: doctor.appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch doctors with filtering
export const getDoctors = async (req, res) => {
  try {
    const {
      availabilityDay,
      availabilityTime,
      minFees,
      maxFees,
      minRating,
      minAge,
      maxAge,
      gender,
      overall_experience,
    } = req.query;

    // Build the filter object
    const filter = {};

    // Filter by availability (day and time)
    if (availabilityDay && availabilityTime) {
      filter.$or = [
        {
          "chamber.chamber_availability": {
            $elemMatch: {
              day: availabilityDay,
              start_time: { $lte: availabilityTime },
              end_time: { $gte: availabilityTime },
            },
          },
        },
        {
          "hospital_visits.days": availabilityDay,
          "hospital_visits.start_time": { $lte: availabilityTime },
          "hospital_visits.end_time": { $gte: availabilityTime },
        },
      ];
    }

    // Filter by fees (range)
    if (minFees || maxFees) {
      filter.fees = {};
      if (minFees) filter.fees.$gte = Number(minFees);
      if (maxFees) filter.fees.$lte = Number(maxFees);
    }

    // Filter by rating (minimum rating)
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // Filter by age (range)
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = Number(minAge);
      if (maxAge) filter.age.$lte = Number(maxAge);
    }

    // Filter by gender
    if (gender) {
      filter.gender = gender;
    }

    // Fetch doctors based on the filter and select specific fields in the desired order
    const doctors = await Doctor.find(filter).select({
      name: 1,
      age: 1,
      image: 1,
      gender: 1,
      overall_experience: 1,
      contact_info: 1,
      chamber: 1,
      hospital_visits: 1,
      qualifications: 1,
      reviews: 1,
      rating: 1,
      fees: 1,
      specialization: 1,
      createdAt: 1,
      __v: 1,
      _id: 1,
    });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
