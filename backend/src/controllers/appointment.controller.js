import Appointment from "../model/appointment.js";
import Doctor from "../model/doctor.js";

// Function to check doctor availability
export const checkDoctorAvailability = async (doctor_id, type, date, time) => {
  // Fetch doctor's details
  const doctor = await Doctor.findById(doctor_id);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Convert date to a day of the week (e.g., "Mon")
  const appointmentDay = new Date(date).toLocaleString("en-US", {
    weekday: "short",
  });

  if (type === "chamber") {
    // Check chamber availability
    if (!doctor.chamber.has_chamber) {
      throw new Error("Doctor does not have a chamber");
    }

    const chamberSchedule = doctor.chamber.chamber_availability.find(
      (slot) => slot.day === appointmentDay
    );

    if (!chamberSchedule) {
      throw new Error("Doctor is not available at the chamber on this day");
    }

    // Check if the appointment time is within chamber working hours
    const appointmentTime = new Date(`1970-01-01T${time}:00`);
    const startTime = new Date(`1970-01-01T${chamberSchedule.start_time}:00`);
    const endTime = new Date(`1970-01-01T${chamberSchedule.end_time}:00`);

    if (appointmentTime < startTime || appointmentTime >= endTime) {
      throw new Error("Doctor is not available at the chamber at this time");
    }
  } else if (type === "hospital") {
    // Check hospital availability
    const hospitalSchedule = doctor.hospital_visits.find((visit) =>
      visit.days.includes(appointmentDay)
    );

    if (!hospitalSchedule) {
      throw new Error("Doctor is not available at the hospital on this day");
    }

    // Check if the appointment time is within hospital working hours
    const appointmentTime = new Date(`1970-01-01T${time}:00`);
    const startTime = new Date(`1970-01-01T${hospitalSchedule.start_time}:00`);
    const endTime = new Date(`1970-01-01T${hospitalSchedule.end_time}:00`);

    if (appointmentTime < startTime || appointmentTime >= endTime) {
      throw new Error("Doctor is not available at the hospital at this time");
    }
  } else {
    throw new Error("Invalid appointment type");
  }

  // Check for existing appointments at the same time
  const existingAppointment = await Appointment.findOne({
    doctor_id,
    date,
    time,
    status: { $in: ["Pending", "Confirmed"] },
  });

  if (existingAppointment) {
    throw new Error("Doctor already has an appointment at this time");
  }

  return true; // Doctor is available
};

// Function to book an appointment
export const bookAppointment = async (req, res) => {
  const { user_id, doctor_id, type, date, time, notes } = req.body;

  try {
    // Check doctor availability
    await checkDoctorAvailability(doctor_id, type, date, time);

    // Create new appointment
    const newAppointment = new Appointment({
      user_id,
      doctor_id,
      type,
      date,
      time,
      notes,
      status: "Confirmed",
    });

    await newAppointment.save();
    res
      .status(201)
      .json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get available time slots
export const getAvailableTimeSlots = async (req, res) => {
  const { doctor_id, type, date } = req.query;

  try {
    const doctor = await Doctor.findById(doctor_id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const appointmentDay = new Date(date).toLocaleString("en-US", {
      weekday: "short",
    });

    let schedule;
    if (type === "chamber") {
      schedule = doctor.chamber.chamber_availability.find(
        (slot) => slot.day === appointmentDay
      );
    } else if (type === "hospital") {
      schedule = doctor.hospital_visits.find((visit) =>
        visit.days.includes(appointmentDay)
      );
    } else {
      throw new Error("Invalid appointment type");
    }

    if (!schedule) {
      throw new Error("Doctor is not available on this day");
    }

    // Generate time slots (e.g., every 30 minutes)
    const startTime = new Date(`1970-01-01T${schedule.start_time}:00`);
    const endTime = new Date(`1970-01-01T${schedule.end_time}:00`);
    const timeSlots = [];

    for (
      let time = startTime;
      time < endTime;
      time.setMinutes(time.getMinutes() + 30)
    ) {
      const timeString = time.toTimeString().slice(0, 5); // Convert to "HH:MM" format
      timeSlots.push(timeString);
    }

    res.status(200).json({ timeSlots });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
