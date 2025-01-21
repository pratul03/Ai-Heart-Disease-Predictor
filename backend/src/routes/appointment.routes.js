import express from "express";
import {
  bookAppointment,
  getAvailableTimeSlots,
  getDoctorAppointments,
  getUserAppointments,
} from "../controllers/appointment.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { docAuthMiddleware } from "../middlewares/doc.auth.middleware.js";

const router = express.Router();

// Book an appointment
router.post("/book", authMiddleware, bookAppointment);

// Get available time slots
router.get("/slots", getAvailableTimeSlots);

//get user appointments
router.get("/user/:user_id", authMiddleware, getUserAppointments);

// get doctor appointments
router.get("/doctor/:doctor_id", docAuthMiddleware, getDoctorAppointments);

export default router;
