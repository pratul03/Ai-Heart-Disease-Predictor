import express from "express";
import { signup, login, updateUser } from "../controllers/auth.controller.js";
import { upload } from "../config/multer.js";
import {
  adminMiddleware,
  authMiddleware as authenticate,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single("avatar"), signup);

router.post("/login", login);

router.get("/admin/dashboard", authenticate, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Dashboard!" });
});
router.get("/user/dashboard", authenticate, (req, res) => {
  res.status(200).json({ message: "Welcome to the User Dashboard!" });
});

router.put(
  "/update/:userId",
  authenticate, // Ensure the user is authenticated
  upload.single("avatar"), // Handle avatar upload
  updateUser
);

export default router;
