import Appointment from "../model/appointment.js";
import Doctor from "../model/doctor.js";
import User from "../model/user.js";

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

    // Fetch doctor details
    const doctor = await Doctor.findById(doctor_id);
    const user = await User.findById(user_id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Prepare appointment object
    const appointmentData = {
      user_id,
      user_name: user.name, // Include user's name
      doctor_id,
      doctor_name: doctor.name, // Include doctor's name
      type,
      date,
      time,
      notes,
      status: "Confirmed",
    };

    // Add chamber_info or hospital_info based on appointment type
    if (type === "chamber" && doctor.chamber) {
      appointmentData.chamber_info = {
        chamber_name: doctor.chamber.chamber_name,
        chamber_address: doctor.chamber.chamber_address,
      };
    } else if (type === "hospital" && doctor.hospital_visits) {
      // Assuming hospital_visits is an array, use the first entry for simplicity
      const hospitalVisit = doctor.hospital_visits[0];
      if (hospitalVisit) {
        appointmentData.hospital_info = {
          hospital_name: hospitalVisit.hospital_name,
          hospital_address: hospitalVisit.hospital_address,
        };
      }
    }

    // Create new appointment
    const newAppointment = new Appointment(appointmentData);
    //console.log(newAppointment);
    await newAppointment.save();

    if (!newAppointment) {
      throw new Error("Failed to book appointment");
    }

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
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

    // Get current time
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Current time in "HH:MM" format

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

      // Check if the time slot is in the future
      if (date === now.toISOString().split("T")[0]) {
        // If the date is today, filter out past time slots
        if (timeString > currentTime) {
          timeSlots.push(timeString);
        }
      } else {
        // If the date is in the future, include all time slots
        timeSlots.push(timeString);
      }
    }

    res.status(200).json({ timeSlots });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  const { user_id } = req.params; // Assuming user_id is passed as a URL parameter

  try {
    // Fetch all appointments for the user
    const appointments = await Appointment.find({ user_id })
      .populate("doctor_id", "doctor_name") // Populate doctor's name
      .sort({ date: 1, time: 1 }); // Sort by date and time

    if (!appointments || appointments.length === 0) {
      return res
        .status(200)
        .json({ message: "No appointments found for this user." });
    }

    // Format the response
    const formattedAppointments = appointments.map((appointment) => ({
      doctor_name: appointment.doctor_id.doctor_name, // Doctor's name
      type: appointment.type,
      location:
        appointment.type === "chamber"
          ? appointment.chamber_info
          : appointment.hospital_info, // Chamber or hospital info
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes,
    }));

    res.status(200).json({ appointments: formattedAppointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  const { doctor_id } = req.params; // Assuming doctor_id is passed as a URL parameter

  try {
    // Fetch all appointments for the doctor
    const appointments = await Appointment.find({ doctor_id })
      .populate("user_id", "name") // Populate user's name
      .sort({ date: 1, time: 1 }); // Sort by date and time

    if (!appointments || appointments.length === 0) {
      return res
        .status(200)
        .json({ message: "No appointments found for this doctor." });
    }

    // Format the response
    const formattedAppointments = appointments.map((appointment) => ({
      user_name: appointment.user_id.name, // User's name
      type: appointment.type,
      location:
        appointment.type === "chamber"
          ? appointment.chamber_info
          : appointment.hospital_info, // Chamber or hospital info
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes,
    }));

    res.status(200).json({ appointments: formattedAppointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
