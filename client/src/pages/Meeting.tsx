import Meetings from "@/components/custom/meetings";
import { userAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";

function Meeting() {
  const user = useRecoilValue(userAtom);

  return (
    <div className="w-full ml-8 mt-10">
      <img
        src={user.avatar || "/pro.jpg"}
        alt=""
        className="absolute top-0 right-0 w-12 h-12 m-2.5 rounded-full"
      />
      <Meetings />
    </div>
  );
}

export default Meeting;
