import express from "express";
import {
  bookAppointment,
  getAvailableTimeSlots,
} from "../controllers/appointment.controller.js";

const router = express.Router();

// Book an appointment
router.post("/book", bookAppointment);

// Get available time slots
router.get("/slots", getAvailableTimeSlots);

export default router;
