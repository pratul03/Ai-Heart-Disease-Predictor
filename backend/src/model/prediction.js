// src/models/Prediction.js
import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: { type: Number, required: true },
  bloodPressure: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  predictionResult: {
    prediction: { type: String, required: true },
    confidence: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
