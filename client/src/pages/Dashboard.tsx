import { Exercise } from "@/components/custom/exercise-chart";
import Meetings from "@/components/custom/meetings";
import Profile from "@/components/custom/profile";
import { userAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";

function Dashboard() {
  const user = useRecoilValue(userAtom);

  return (
    <div className="w-full flex ml-8 mt-10">
      <img
        src={user.avatar || "/pro.jpg"}
        alt=""
        className="absolute top-0 right-0 w-12 h-12 m-2.5 rounded-full"
      />
      <div className="w-full grid grid-flow-col justify-between gap-2">
          <div className="gap-4">
            <Profile />
          </div>
          <div className="">
            <Meetings />
          </div>
        <div className="row-span-2">
          <Exercise />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
