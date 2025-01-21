import HeartRiskPredictorForm from "@/components/custom/heart-risk-predictor-form";
import PredictResult from "@/components/custom/predict-result";
import { Button } from "@/components/ui/button";
import { predictionResultAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";

const HeartRiskPredictor = () => {
  const result = useRecoilValue(predictionResultAtom);
  return (
    <div className="w-full ml-8 mt-10">
      <HeartRiskPredictorForm />
      <div>
        {result.message && (
          <div className="flex justify-center items-center space-x-10">
            <PredictResult
              result={result.message}
              percentage={result.probablity}
            />
            <Button variant={"secondary"} className="text-lg">Suggested Doctors</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartRiskPredictor;
