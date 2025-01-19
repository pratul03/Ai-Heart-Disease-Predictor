import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getDoctors,
  registerDoctor,
  loginDoctor,
} from "../controllers/doctor.controller.js";
import {
  adminMiddleware,
  authMiddleware,
  doctorMiddleware,
} from "../middlewares/authMiddleware.js";
import { uploadDoctors } from "../config/multer.js";
import { docAuthMiddleware as authenticate } from "../middlewares/doc.auth.middleware.js";

const router = express.Router();

// Protected routes (only accessible by admins)
router.post(
  "/register/doc",
  authMiddleware || authenticate,
  adminMiddleware || doctorMiddleware,
  uploadDoctors.single("image"),
  registerDoctor
); // Create a new doctor

router.post("/login/docs", loginDoctor);

router.put(
  "/update/doc/:id",
  authMiddleware || authenticate,
  adminMiddleware || doctorMiddleware,
  uploadDoctors.single("image"),
  updateDoctor
); // Update a doctor

router.delete(
  "/remove/doc/:id",
  authMiddleware || authenticate,
  adminMiddleware || doctorMiddleware,
  deleteDoctor
); // Delete a doctor

// Public route (accessible by all users)
router.get("/doctor/dashboard", authenticate, doctorMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the Doctor Dashboard!" });
}); // Doctor dashboard
router.get("/docs/", getDoctors); // Fetch doctors with filters

export default router;
