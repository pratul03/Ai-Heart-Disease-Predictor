import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js"; // Import database connection
import authRoutes from "./routes/auth.routes.js"; // Import authentication routes
import doctorRoutes from "./routes/doctor.routes.js"; // Import doctor routes
import predictionRoutes from "./routes/prediction.routes.js"; // Import prediction routes
import appointmentRoutes from "./routes/appointment.routes.js"; // Import appointment routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Database Connection
connectDB();

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: "Something went wrong!" });
});

//health check point
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (signup, login)
app.use("/api/predictions", predictionRoutes); // Prediction routes
app.use("/api/doctors", doctorRoutes); // Doctor routes
app.use("/api/appointments", appointmentRoutes); // Appointment routes

// Default route
app.get("/", (req, res) => {
  res.send("Heart Disease Prediction API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
