import HeartRiskPredictorForm from "@/components/custom/heart-risk-predictor-form";
import PredictResult from "@/components/custom/predict-result";
import { Button } from "@/components/ui/button";
import { predictionResultAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"} className="text-lg">
                  Suggested Doctors
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1100px]">
                <DialogHeader>
                  <DialogTitle>Suggested Doctors</DialogTitle>
                  <DialogDescription>
                    These are the doctors that we suggest you to visit. You can
                    visit other doctors as well.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    {result
                      ? result.suggested_doctors.slice(0,4).map((doctor) => {
                          return (
                            <div className="w-[250px] h-[300px] flex flex-col border rounded-md border-cyan-700 p-5">
                              <div className="flex flex-col justify-between items-start">
                                <div className="flex justify-between items-center w-full">
                                  <p className="text-lg">{doctor.name}</p>
                                  <p className="text-cyan-500">{doctor.experience}</p>
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                  <p className="text-cyan-500 text-lg mt-5">Address :</p>
                                </div>
                                <div className="flex flex-col gap-2 mt-3 ml-3">
                                    <p className="inline-flex gap-2"><p>City :</p> {doctor.city}</p>
                                    <p className="gap-2"><p>Hospitals :</p> {doctor.hospital}</p>
                                    <p className="inline-flex gap-2"><p>Pincode :</p> {doctor.pin}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : "No suggesion found"}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartRiskPredictor;
