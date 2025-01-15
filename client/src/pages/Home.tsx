import { Auth } from "@/components/custom/authDialog";
import Navigation from "@/components/custom/navigation";

function Home() {
  return (
    <>
      <div className="z-0 w-screen h-screen bg-[url('/bg.jpg')] bg-cover backdrop-blur-sm"></div>
      <div className="absolute top-0 backdrop-blur-md w-full h-screen flex flex-col items-center ">
        <div className="w-full h-20 top-0 mx-5 flex justify-between items-center border-b-2 border-cyan-800">
          <div className="ml-5 text-xl font-mono font-bold">Logo</div>
          <Navigation />
          <Auth label={"Join Us"}/>
        </div>
        <div className="w-full px-20 py-10 flex flex-row justify-between items-center">
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
            <Auth label={"Get Started"}/>
          </div>
          <div className="">
            <img src="/heart.svg" height={600} width={600} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
