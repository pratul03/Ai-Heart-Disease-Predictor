import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import database connection
import authRoutes from "./routes/authRoutes.js"; // Import authentication routes
import predictionRoutes from "./routes/predictionRoutes.js"; // Import prediction routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (signup, login)
app.use("/api/predictions", predictionRoutes); // Prediction routes

// Default route
app.get("/", (req, res) => {
  res.send("Heart Disease Prediction API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
