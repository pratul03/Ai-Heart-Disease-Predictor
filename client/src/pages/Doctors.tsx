import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { userAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/ui/button";

export const doctors = [
  {
    name: "Dr. John Doe",
    image: "/doctor (1).jpg",
    expertise: "Cardiothoracic Surgery",
    experience: "15 Y",
    description:
      "Dr. John Doe is a highly skilled cardiothoracic surgeon with expertise in minimally invasive surgeries.",
  },
  {
    name: "Dr. Jane Smith",
    image: "/doctor (2).jpg",
    expertise: "Neurology",
    experience: "12 Y",
    description:
      "Dr. Jane Smith specializes in treating neurological disorders, with a focus on brain health and neuroplasticity.",
  },
  {
    name: "Dr. Robert Brown",
    image: "/doctor (4).jpg",
    expertise: "Pediatrics",
    experience: "10 Y",
    description:
      "Dr. Robert Brown has a passion for helping children with medical conditions, offering personalized care and treatment.",
  },
  {
    name: "Dr. Emily Clark",
    image: "/doctor (3).jpg",
    expertise: "Orthopedic Surgery",
    experience: "20 Y",
    description:
      "Dr. Emily Clark is an orthopedic surgeon with a deep knowledge of musculoskeletal health and innovative surgical procedures.",
  },
];

function Doctors() {
  const user = useRecoilValue(userAtom);
  return (
    <div className="w-full ml-8 mt-10">
      <img
        src={user.avatar || "/pro.jpg"}
        alt=""
        className="absolute top-0 right-0 w-12 h-12 m-2.5 rounded-full"
      />
      <div className="mt-2">
        <p className="text-4xl text-center font-semibold text-cyan-400">
          Most Recommened Doctors
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
          {doctors.map((doctor) => {
            return (
              <Card className="w-[300px] h-[500px]">
                <CardHeader>
                  <CardTitle className="rounded-md m-0">
                    <img
                      src={doctor.image}
                      alt=""
                      className="rounded-md w-[300px] h-[200px]"
                    />
                  </CardTitle>
                  <CardDescription className="flex justify-between items-center text-cyan-300">
                    <p className="text-xl font-semibold">{doctor.name}</p>
                    <p className="text-md font-semibold">
                      Exp : {doctor.experience} +
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-cyan-500 font-semibold mb-2">
                    Expert in : {doctor.expertise}
                  </p>
                  <p className="text-justify">{doctor.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button>Profile</Button>
                  <Button>Check Availability</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
