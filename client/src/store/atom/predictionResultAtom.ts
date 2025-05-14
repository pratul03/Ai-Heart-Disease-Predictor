import { atomWithStorage } from "jotai/utils";

interface SuggestedDoctor {
    age: number;
    city: string;
    experience: string;
    gender: string;
    hospital: string;
    name: string;
    pin: number;
  }
  
  export const predictionResultAtom = atomWithStorage<{
    message: string;
    probablity: number;
    suggested_doctors: Array<SuggestedDoctor>;
  }>("predictionResult", {
      message: "",
      probablity: 0,
      suggested_doctors: [
        {
          age: 0,
          city: "",
          experience: "",
          gender: "",
          hospital: "",
          name: "",
          pin: 0,
        },
      ],
    },
  );
  