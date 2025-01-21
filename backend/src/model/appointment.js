import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user
  user_name: { type: String, required: true }, // Add userName field
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  }, // Reference to the doctor
  doctor_name: { type: String, required: true }, // Add doctorName field
  type: {
    type: String,
    enum: ["hospital", "chamber"],
    required: true,
  }, // Type of appointment (hospital or chamber)
  hospital_info: {
    hospital_name: { type: String }, // Name of the hospital (for hospital appointments)
    hospital_address: { type: String }, // Address of the hospital (for hospital appointments)
  },
  chamber_info: {
    chamber_name: { type: String }, // Name of the chamber (for chamber appointments)
    chamber_address: { type: String }, // Address of the chamber (for chamber appointments)
  },
  date: { type: Date, required: true }, // Appointment date
  time: { type: String, required: true }, // Appointment time (e.g., "14:30")
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  }, // Appointment status
  notes: { type: String }, // Additional notes for the appointment
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
