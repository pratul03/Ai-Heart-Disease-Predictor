import Doctor from "../model/doctor.js";
import { configDotenv } from "dotenv";
import cloudinary from "../config/cloudinary.js";

configDotenv();
// Create a new doctor
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
    } = req.body;

    // Input validation
    if (
      !name ||
      !specialization ||
      !age ||
      !gender ||
      !contact_info ||
      !fees ||
      !qualifications
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

    // Upload image to Cloudinary if provided
    let imageUrl =
      "https://res.cloudinary.com/dxnodvf4b/image/upload/v1737139372/doc_mytidw.avif";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "doctors",
        width: 500,
        crop: "scale",
      });
      imageUrl = result.secure_url;
    }

    const newDoctor = new Doctor({
      name,
      specialization,
      age,
      gender,
      image: imageUrl,
      contact_info,
      fees,
      chamber,
      hospital_visits,
      qualifications,
    });

    await newDoctor.save();

    res
      .status(201)
      .json({ message: "Doctor registered successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
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

    // Fetch doctors based on the filter
    const doctors = await Doctor.find(filter);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
