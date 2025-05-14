import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";

export const doctors = [
  {
    name: "Dr. Arvind Sharma",
    specialization: "Cardiology",
    age: 50,
    gender: "Male",
    contact_info: {
      phone: "+91 9876543210",
      email: "arvind.sharma@healthcare.in",
    },
    fees: "₹1200",
    chamber: "Sharma Heart Care, Connaught Place, Delhi",
    hospital_visits: ["AIIMS Delhi", "Fortis Escorts Heart Institute"],
    qualifications: ["MBBS", "MD (Cardiology)", "DM (Cardiology)"],
    overall_experience: "25 Y",
    image: "/doctor (1).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Priya Iyer",
    specialization: "Dermatology",
    age: 38,
    gender: "Female",
    contact_info: {
      phone: "+91 9823456789",
      email: "priya.iyer@skincareclinic.in",
    },
    fees: "₹800",
    chamber: "Iyer Skin & Aesthetic Clinic, T. Nagar, Chennai",
    hospital_visits: ["Apollo Hospital Chennai"],
    qualifications: ["MBBS", "Diploma in Dermatology", "MD (Dermatology)"],
    overall_experience: "12 Y",
    image: "/doctor (2).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Rajesh Khurana",
    specialization: "Orthopedics",
    age: 45,
    gender: "Male",
    contact_info: {
      phone: "+91 9954321765",
      email: "rajesh.khurana@orthocare.in",
    },
    fees: "₹1000",
    chamber: "Khurana Ortho Center, Sector 62, Noida",
    hospital_visits: ["Max Super Specialty Hospital", "Jaypee Hospital"],
    qualifications: ["MBBS", "MS (Orthopedics)"],
    overall_experience: "18 Y",
    image: "/doctor (3).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Sneha Reddy",
    specialization: "Pediatrics",
    age: 40,
    gender: "Female",
    contact_info: {
      phone: "+91 9123456780",
      email: "sneha.reddy@childcare.in",
    },
    fees: "₹700",
    chamber: "Happy Kids Clinic, Jubilee Hills, Hyderabad",
    hospital_visits: ["Rainbow Children's Hospital"],
    qualifications: ["MBBS", "MD (Pediatrics)"],
    overall_experience: "15 Y",
    image: "/doctor (4).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Amitabh Desai",
    specialization: "General Medicine",
    age: 55,
    gender: "Male",
    contact_info: {
      phone: "+91 8765432190",
      email: "amitabh.desai@healthhub.in",
    },
    fees: "₹600",
    chamber: "Desai General Clinic, Churchgate, Mumbai",
    hospital_visits: ["Breach Candy Hospital", "Saifee Hospital"],
    qualifications: ["MBBS", "MD (General Medicine)"],
    overall_experience: "30 Y",
    image: "/doctor (1).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Kavita Menon",
    specialization: "Gynecology",
    age: 42,
    gender: "Female",
    contact_info: {
      phone: "+91 9012345678",
      email: "kavita.menon@womensclinic.in",
    },
    fees: "₹1000",
    chamber: "Menon Women's Clinic, Viman Nagar, Pune",
    hospital_visits: ["Jehangir Hospital", "Ruby Hall Clinic"],
    qualifications: ["MBBS", "MD (Gynecology)"],
    overall_experience: "16 Y",
    image: "/doctor (2).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Vikram Sethi",
    specialization: "Oncology",
    age: 48,
    gender: "Male",
    contact_info: {
      phone: "+91 9934567890",
      email: "vikram.sethi@cancercenter.in",
    },
    fees: "₹1500",
    chamber: "Sethi Cancer Care, Jayanagar, Bangalore",
    hospital_visits: ["HCG Cancer Hospital", "Manipal Hospital"],
    qualifications: ["MBBS", "MD (Oncology)", "DM (Medical Oncology)"],
    overall_experience: "20 Y",
    image: "/doctor (3).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Anjali Das",
    specialization: "Psychiatry",
    age: 35,
    gender: "Female",
    contact_info: {
      phone: "+91 9876543120",
      email: "anjali.das@mentalhealth.in",
    },
    fees: "₹900",
    chamber: "Mind Care Clinic, Park Street, Kolkata",
    hospital_visits: ["Belle Vue Clinic", "Fortis Hospital"],
    qualifications: ["MBBS", "MD (Psychiatry)"],
    overall_experience: "10 Y",
    image: "/doctor (4).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Sanjay Verma",
    specialization: "Neurology",
    age: 50,
    gender: "Male",
    contact_info: {
      phone: "+91 9234567890",
      email: "sanjay.verma@brainhealth.in",
    },
    fees: "₹2000",
    chamber: "Neuro Health Clinic, Banjara Hills, Hyderabad",
    hospital_visits: ["Apollo Hospital Hyderabad", "KIMS Hospital"],
    qualifications: ["MBBS", "MD (Neurology)", "DM (Neurology)"],
    overall_experience: "25 Y",
    image: "/doctor (1).jpg",
    role: "Doctor",
  },
  {
    name: "Dr. Ramesh Patil",
    specialization: "Urology",
    age: 47,
    gender: "Male",
    contact_info: {
      phone: "+91 7891234567",
      email: "ramesh.patil@urologycare.in",
    },
    fees: "₹1100",
    chamber: "Patil Urology Clinic, Andheri West, Mumbai",
    hospital_visits: ["Nanavati Hospital", "Lilavati Hospital"],
    qualifications: ["MBBS", "MS (Urology)", "MCh (Urology)"],
    overall_experience: "22 Y",
    image: "/doctor (2).jpg",
    role: "Doctor",
  },
];

function Doctors() {
  return (
    <div className="w-full pl-3">
      <div className="mt-2">
        <p className="text-4xl text-center font-semibold text-cyan-400">
          Most Recommened Doctors
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
          {doctors.slice(0, 4).map((doctor) => {
            return (
              <Card className="w-[300px] h-[400px]">
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
                      Exp : {doctor.overall_experience} +
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-cyan-500 font-semibold mb-2">
                    Expert in : {doctor.specialization}
                  </p>
                  
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-4">
                          <img
                            src={doctor.image}
                            alt=""
                            className="rounded-full w-[150px]"
                          />
                          <div>
                            <p className="text-3xl">{doctor.name}</p>
                            <p className="text-lg text-cyan-500 mt-1">
                              {doctor.specialization}
                            </p>
                            <div className="flex gap-4 mt-4">
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    doctor.contact_info.email
                                  );
                                  toast.success("Email copied to clipboard");
                                }}
                              >
                                <Mail />
                              </Button>
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    doctor.contact_info.phone
                                  );
                                  toast.success(
                                    "Phone number copied to clipboard"
                                  );
                                }}
                              >
                                <Phone />
                              </Button>
                            </div>
                          </div>
                        </DialogTitle>
                        <DialogDescription className="text-cyan-300 ml-4 text-md inline-block">
                          <p className="font-semibold">Qualifications : {doctor.qualifications.join(", ")}</p>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="ml-4">
                        <Label className="text-cyan-100 text-md">Chamber</Label>
                        <p className="mx-2 mb-3">{doctor.chamber}</p>
                        <Label className="text-cyan-100 text-md">Hospital Visits</Label>
                        <p className="mx-2">{doctor.hospital_visits.join(", ")}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button>Check Availability</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button className="mt-10 text-lg" variant={"secondary"}>View All Doctors</Button>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
