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
   
  const meetings = [
    {
      id: "001",
      dname: "Dr. Pratul Makar",
      topic: "Chest Pain",
      time: "02:30 P.M 16-02-2025",
      link: "#"
    },
    {
      id: "002",
      dname: "Dr. Aritra",
      topic: "Back Pain",
      time: "11:00 A.M 18-02-2025",
      link: "#"
    },
  ]


function Meetings() {
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
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium">
                    {meeting.id}
                  </TableCell>
                  <TableCell>{meeting.dname}</TableCell>
                  <TableCell>{meeting.topic}</TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell className="text-right">
                    <Button variant={"outline"}>Join</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between text-slate-500">
          * You can join the session 5 mins before the time it has been started.
        </CardFooter>
      </Card>
    </div>
  );
}

export default Meetings;
