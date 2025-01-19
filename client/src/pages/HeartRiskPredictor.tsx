import HeartRiskPredictorForm from "@/components/custom/heart-risk-predictor-form";
import PredictResult from "@/components/custom/predict-result";
import { predictionResultAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";


const HeartRiskPredictor = () => {
  const result = useRecoilValue(predictionResultAtom);
  return (
    <div className="w-full ml-8 mt-10">
      <HeartRiskPredictorForm />
      {result.result && <PredictResult result={result.result} percentage={result.probability} />}
    </div>
  );
};

export default HeartRiskPredictor;