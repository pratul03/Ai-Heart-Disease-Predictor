import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

function ContactUs() {
  return (
    <div className="w-[1200px] flex items-center mt-10">
      <Card className="mx-10 w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Contact Us</CardTitle>
          <CardDescription className="text-md">
            Stay connected with us. We are here to help you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Name</Label>
            <Input id="username" placeholder="John Doe" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Email</Label>
            <Input id="username" placeholder="johndoe@example.com"></Input>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Subject</Label>
            <Input id="username" placeholder="Enter subject of your thought"></Input>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Message</Label>
            <Input id="username" placeholder="Enter the message"></Input>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant={"secondary"}
          onClick={() => {
            toast.success("Thanks for submitting your query. We will get back to you soon.");
          }}
          >Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ContactUs;
