import express from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
} from "../controllers/doctor.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes (only accessible by admins)
router.post("/register/doc", authMiddleware, adminMiddleware, createDoctor); // Create a new doctor
router.put("/update/doc/:id", authMiddleware, adminMiddleware, updateDoctor); // Update a doctor
router.delete("/remove/doc/:id", authMiddleware, adminMiddleware, deleteDoctor); // Delete a doctor

// Public route (accessible by all users)
router.get("/", getDoctors); // Fetch doctors with filters

export default router;
