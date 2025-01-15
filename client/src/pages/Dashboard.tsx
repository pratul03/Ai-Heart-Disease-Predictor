import { Exercise } from "@/components/custom/exercise-chart";
import Profile from "@/components/custom/profile";
import { userAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";

function Dashboard() {

  const user = useRecoilValue(userAtom);

  return (
    <div className="w-full flex ml-7">
      <img src={user.avatar} alt="" className="absolute top-0 right-0 w-12 h-12 m-2.5" />
      <div className="w-full flex flex-row justify-between">
          <Profile />
          <Exercise />
      </div>
    </div>
  );
}

export default Dashboard;
