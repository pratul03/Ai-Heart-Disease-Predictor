import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getDoctors,
  registerDoctor,
} from "../controllers/doctor.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import { uploadDoctors } from "../config/multer.js";

const router = express.Router();

// Protected routes (only accessible by admins)
router.post(
  "/register/doc",
  authMiddleware,
  adminMiddleware,
  uploadDoctors.single("image"),
  registerDoctor
); // Create a new doctor

router.put(
  "/update/doc/:id",
  authMiddleware,
  adminMiddleware,
  uploadDoctors.single("image"),
  updateDoctor
); // Update a doctor

router.delete("/remove/doc/:id", authMiddleware, adminMiddleware, deleteDoctor); // Delete a doctor

// Public route (accessible by all users)
router.get("/docs/", getDoctors); // Fetch doctors with filters

export default router;
