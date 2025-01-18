import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userAtom } from "@/store/atom/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function Tools() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  return (
    <div className="w-full ml-8 mt-10">
      <img
        src={user.avatar || "/pro.jpg"}
        alt=""
        className="absolute top-0 right-0 w-12 h-12 m-2.5 rounded-full"
      />
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
