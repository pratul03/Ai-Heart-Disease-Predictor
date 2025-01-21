import { Auth } from "@/components/custom/authDialog";
import HeartRiskPredictorForm from "@/components/custom/heart-risk-predictor-form";
import Navigation from "@/components/custom/navigation";
import PredictResult from "@/components/custom/predict-result";
import { Button } from "@/components/ui/button";
import { predictionResultAtom } from "@/store/atom/atom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function HeartRiskPredictorDemo() {
  const [result, setResult] = useRecoilState(predictionResultAtom);
  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full h-full flex flex-col items-center scrollbar">
        {/* Fixed navigation bar */}
        <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-3 border-b-2 border-cyan-800">
          <div className="text-xl font-mono font-bold">Logo</div>
          <Navigation />
          <Auth label={"Join Us"} />
        </div>
        <div className="fixed top-20 left-5 w-full z-50">
          <Button
            variant={"outline"}
            onClick={() => {
              navigate("/");
              setResult({
                message: "",
                probablity: 0,
                suggested_doctors: [],
              });
            }}
          >
            <ArrowLeft />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-between items-center mt-20">
          <HeartRiskPredictorForm />
          {result.message && (
            <PredictResult
              result={result.message}
              percentage={result.probablity}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HeartRiskPredictorDemo;
