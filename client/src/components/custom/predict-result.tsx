import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PredictResult({result, percentage} : {result: string, percentage: number}) {
  
  return (
    <>
      <Card className="w-[600px] h-min mt-5">
        <CardHeader>
          <CardTitle className="text-2xl">🤖 Prediction Result</CardTitle>
          <CardDescription className="text-md"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{result}</p>
            <p className="text-lg mt-2">Heart Disease Risk Percentage: {String(percentage)}%</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default PredictResult;
