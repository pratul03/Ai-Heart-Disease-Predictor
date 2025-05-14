import AppointmentDoctor from "@/components/custom/appointment-doctor";
import WelcomeNote from "@/components/custom/welcome-note";
import { doctorAtom } from "@/store/atom/doctorAtom";
import { useAtomValue } from "jotai/react";


function DoctorDashboard() {
  const doctor = useAtomValue(doctorAtom);
  return (
    <div className="w-full flex ml-8 mt-10">
        <WelcomeNote user={doctor}/>
        <AppointmentDoctor />
    </div>
  )
}

export default DoctorDashboard