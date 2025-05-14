import { Exercise } from "@/components/custom/exercise-chart";
import Meetings from "@/components/custom/meetings";
import WelcomeNote from "@/components/custom/welcome-note";
import { userAtom } from "@/store/atom/userAtom";
import { useAtomValue } from "jotai/react";

function Dashboard() {
  const user = useAtomValue(userAtom);

  return (
    <div className="w-full flex bg-background p-2">
      <div className="w-full grid grid-flow-col justify-between gap-2">
        <div className="gap-4">
          <WelcomeNote user={user} />
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
