import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../mode-toggle";
import { useAtomValue } from "jotai/react";
import { userAtom } from "@/store/atom/userAtom";

function Appbar() {
  const user = useAtomValue(userAtom);
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14 border-b border-slate-600">
      <div className="w-full flex justify-between items-center gap-2 px-4">
        <div className="flex gap-14 items-center">
          <SidebarTrigger className="-ml-1" />
          <p className="text-3xl font-extrabold font-[Consolas]">HeartSync</p>
        </div>
        <div className="flex items-center gap-5">
            <ModeToggle />
          <img
            src={user.avatar || "/pro.jpg"}
            alt=""
            className="w-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Appbar;
