import express from "express";
import { createPrediction } from "../controllers/predictionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPrediction);

export default router;
