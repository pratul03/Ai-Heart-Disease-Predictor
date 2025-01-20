import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Auth } from "@/components/custom/authDialog";
import Banner from "@/components/custom/banner";
import Navigation from "@/components/custom/navigation";
import { doctors } from "./Doctors";
import Testimonials from "@/components/custom/testimonials";
import { Codesandbox, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthDoctor } from "@/components/custom/auth-dialog-doctor";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="z-0 w-full h-screen bg-[url('/bg.jpg')] bg-cover"></div>
      <div className="absolute top-0 backdrop-blur-md w-full h-max flex flex-col items-center scrollbar">
        <div className="w-full m-5 pb-5 top-0 flex justify-between items-center border-b-2 border-cyan-800">
          <div className="ml-5 text-xl font-mono font-bold">Logo</div>
          <Navigation />

          <div>
            <AuthDoctor label={"Doctor Login"} />
          <Auth label={"Join Us"} />
          </div>
        </div>
        <div className="w-full my-4 px-20 py-10 flex flex-row justify-between items-center">
          <div className="p-20">
            <p className="text-5xl font-mono font-bold p-1 bg-clip-text text-transparent bg-gradient-to-tl from-teal-400 to-fuchsia-500">
              AI-Assisted
            </p>
            <p className="text-5xl font-mono font-bold p-1 bg-clip-text text-transparent bg-gradient-to-tl from-fuchsia-500 to-teal-400">
              Heart Disease Predictor.
            </p>
            <p className="text-xl mb-8 font-serif p-1 text-sky-200">
              Predict heart disease with cutting-edge AI technology. Early
              detection saves lives.
            </p>
            <Auth label={"Get Started"} />
            <Button
              variant={"outline"}
              onClick={() => {
                navigate("/heart-disease-predictor");
              }}
              className="text-cyan-100"
            >
              Try Heart Disease Risk Predictor
            </Button>
          </div>
          <div className="">
            <img src="/heart.svg" height={600} width={600} alt="" />
          </div>
        </div>
        <div className="w-full px-20 py-10 flex flex-col justify-center items-center bg-gradient-to-bl from-cyan-950 via-black to-blue-950">
          <Banner />
          <div className="mt-10">
            <p className="text-5xl text-center font-semibold text-cyan-100">
              Our Most Recommended Doctors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {doctors.slice(0, 4).map((doctor) => {
                return (
                  <Card className="w-[320px] h-[450px]">
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
                      <div className="flex justify-between items-center mt-5">
                        <div>
                          <p className="text-cyan-400">Qualifications : </p>
                          {doctor.qualifications.slice(0,2).map((degree) => (
                            <li className="list-inside text-slate-200">{degree}</li>
                          ))}
                        </div>
                        <div className="flex gap-4">
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
                              toast.success("Phone number copied to clipboard");
                            }}
                          >
                            <Phone />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full h-screen bg-gradient-to-br from-blue-950 via-black to-purple-800 ">
          <div className="text-5xl text-center mt-10 font-semibold text-cyan-100">
            <p>Our Vision, Our Mission</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="pl-20 mt-10">
              <img src="/vision.svg" alt="" width={"500px"} />
            </div>
            <div>
              <div className="flex flex-col justify-between items-center px-20 h-[400px] backdrop-blur-xl">
                <div className="w-[600px] h-full  shadow-2xl rounded-lg p-6">
                  <h3 className="text-3xl font-semibold text-cyan-400 mb-4 text-center">
                    Our Vision 🤖
                  </h3>
                  <ul className="list-disc list-inside text-lg text-justify text-gray-300">
                    <li>
                      To revolutionize heart health management through
                      cutting-edge AI technology.
                    </li>
                    <li>
                      To create a global ecosystem where heart health solutions
                      are affordable and accessible to all.
                    </li>
                  </ul>
                </div>
                <div className="w-[600px] h-full bg-transparent m-5 shadow-2xl rounded-lg p-6 backdrop-blur-xl">
                  <h3 className="text-3xl font-semibold text-cyan-300 mb-4 text-center">
                    Our Mission 🚀
                  </h3>
                  <ul className="list-disc list-inside text-lg text-justify text-gray-300">
                    <li>
                      Empower Early Detection: Provide accurate and accessible
                      heart disease risk predictions.
                    </li>
                    <li>
                      Leverage AI Innovation: Bridge the gap between technology
                      and healthcare with precision.
                    </li>
                    <li>
                      Enhance Accessibility: Make heart health solutions
                      affordable for all.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-gradient-to-bl from-purple-800 via-black to-rose-900">
          <p className="text-5xl text-center mt-10 font-semibold text-cyan-100">
            Our Testimonials
          </p>
          <div className="mt-10">
            <Testimonials />{" "}
          </div>
        </div>
        <div className="w-full h-full flex flex-col bg-black py-10 text-cyan-100">
          <div className="w-full flex justify-center items-center text-cyan-100 text-xl font-semibold">
            <Codesandbox size={"40px"} /> Project
          </div>
          <div className="flex flex-row justify-between items-center mx-10 mt-5 border py-2 px-4 rounded-md border-cyan-700">
            <p className="text-lg">&copy;2025, All Rights Reserved</p>
            <div>
              <a href="#" className="text-lg mx-2 hover:underline">
                About Us
              </a>
              <a href="#" className="text-lg mx-2 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-lg mx-2 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-lg mx-2 hover:underline">
                Contact Us
              </a>
            </div>
            <div className="text-lg font-bold">Developers</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
