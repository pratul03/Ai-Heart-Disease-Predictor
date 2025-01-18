import Prediction from "../model/prediction.js";
import { predictHeartDisease } from "../services/predictionService.js";

export const createPrediction = async (req, res) => {
  try {
    const { age, bloodPressure, cholesterol } = req.body;

    // Get prediction result from AI model
    const predictionResult = await predictHeartDisease({
      age,
      bloodPressure,
      cholesterol,
    });

    // If user is logged in, save the prediction
    if (req.user) {
      const newPrediction = new Prediction({
        userId: req.user,
        age,
        bloodPressure,
        cholesterol,
        predictionResult,
      });
      await newPrediction.save();
    }

    res.status(200).json({ prediction: predictionResult });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
