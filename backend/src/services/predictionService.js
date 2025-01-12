export const predictHeartDisease = async (userData) => {
  // Dummy prediction logic
  const { age, bloodPressure, cholesterol } = userData;
  let prediction = "Low risk";
  let confidence = 0.85;

  if (age > 50 || bloodPressure > 140 || cholesterol > 240) {
    prediction = "High risk";
    confidence = 0.95;
  }

  return { prediction, confidence };
};
