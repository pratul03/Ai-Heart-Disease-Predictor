import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function Meetings() {

  const [meetings, setMeetings] = useState({
    _id: "",
    dname: "",
    topic: "",
    time: ""
  });
  const date = new Date();
    console.log(date)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://192.168.0.108:8080/api/appointments/slots?doctor_id=678d1d3598035f0b57272406&type=chamber&date=2025-01-21");
        setMeetings(data);
      } catch (error) {
        toast.error("Failed to fetch meetings");
      }
    })()
  },[])

  return (
    <div>
      <Card className="w-[600px] h-min">
        <CardHeader>
          <CardTitle className="text-2xl">Upcoming Meetings 🗓️</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Doctor's name</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Join</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings._id ?  (
                <TableRow key={meetings._id}>
                  <TableCell className="font-medium">
                    {meetings._id}
                  </TableCell>
                  <TableCell>{meetings.dname}</TableCell>
                  <TableCell>{meetings.topic}</TableCell>
                  <TableCell>{meetings.time}</TableCell>
                  <TableCell className="text-right">
                    {meetings.time && <Button variant={"outline"}>Join</Button>}
                  </TableCell>
                </TableRow>
              ): <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-400 text-lg">No meetings scheduled</TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-start text-slate-500">
          <p>* You can join the session 5 mins before the time it has been started(Only for online appointments)</p>
          <p>*Please make sure you're on time.</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Meetings;
