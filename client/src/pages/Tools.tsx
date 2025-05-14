import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Tools() {
  const navigate = useNavigate();
  return (
    <div className="w-full pl-2">
      <p className="text-2xl p-5 font-bold text-cyan-300">Tools</p>
      <Card
        className="w-[400px] h-min cursor-pointer m-5 hover:text-cyan-500"
        onClick={() => navigate("/tools/heart-disease-risk-predictor")}
      >
        <CardHeader>
          <CardTitle className="text-2xl">
            Predict Heart Disease Risk with AI
          </CardTitle>
          <CardDescription className="text-md"></CardDescription>
        </CardHeader>
        {/* <CardContent>
          
        </CardContent>
        <CardFooter className="flex justify-between">

        </CardFooter> */}
      </Card>
    </div>
  );
}

export default Tools;
