import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true }, // e.g., Cardiologist, Dermatologist, etc.
  age: { type: Number, required: true, min: 25, max: 75 }, // Age of the doctor
  gender: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dxnodvf4b/image/upload/v1737139372/doc_mytidw.avif",
  },
  contact_info: {
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: "Invalid email format.",
      },
    },
  },
  fees: { type: Number, required: true }, // Consultation fees
  chamber: {
    has_chamber: { type: Boolean, default: false }, // Whether the doctor has a personal chamber
    chamber_name: { type: String }, // Name of the chamber (e.g., "Dr. John's Clinic")
    chamber_address: { type: String }, // Address of the chamber (as a string)
    chamber_availability: [
      {
        day: {
          type: String,
          enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          required: true,
        },
        start_time: { type: String, required: true }, // e.g., "09:00"
        end_time: { type: String, required: true }, // e.g., "17:00"
      },
    ], // Availability at the chamber
  },
  hospital_visits: [
    {
      hospital_name: { type: String, required: true }, // Name of the hospital
      hospital_address: { type: String, required: true }, // Address of the hospital (as a string)
      days: [
        {
          type: String,
          enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ], // Days the doctor visits the hospital
      start_time: { type: String }, // e.g., "09:00"
      end_time: { type: String }, // e.g., "17:00"
    },
  ], // Details about hospital visits
  qualifications: {
    type: [
      {
        degree: { type: String, required: true }, // e.g., M.B.B.S, MD, MS, etc.
        college: { type: String, required: true }, // Name of the college/university
        university: { type: String, required: true }, // Name of the university
        start_year: { type: Number, required: true }, // Start year of the degree
        end_year: { type: Number, required: true }, // End year of the degree
      },
    ],
    required: true, // Ensures qualifications must be provided
    validate: {
      validator(qualifications) {
        return qualifications.length > 0;
      },
      message: "At least one qualification is required.",
    },
  }, // Doctor's qualifications
  rating: { type: Number, default: 0, min: 0, max: 5 }, // Average rating from patients
  reviews: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who left the review
      comment: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      date: { type: Date, default: Date.now },
    },
  ], // Patient reviews
  createdAt: { type: Date, default: Date.now },
});

// Custom validation: Must have at least one chamber or hospital visit
doctorSchema.pre("save", function (next) {
  const hasChamber = this.chamber && this.chamber.has_chamber;
  const hasHospitalVisits =
    this.hospital_visits && this.hospital_visits.length > 0;

  if (!hasChamber && !hasHospitalVisits) {
    return next(
      new Error("Doctor must have at least one chamber or hospital visit.")
    );
  }
  next();
});
const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
