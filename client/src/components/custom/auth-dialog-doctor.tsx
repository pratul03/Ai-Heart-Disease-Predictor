import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai/react";
import { doctorAtom } from "@/store/atom/doctorAtom";

export function AuthDoctor({ label }: { label: string }) {
  const navigate = useNavigate();
  const setDoctor = useSetAtom(doctorAtom);

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="mr-5">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center">
        <DialogTitle>Keep in touch with us 😊</DialogTitle>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-1 gap-2">
            <TabsTrigger value="account">SignIn</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to signing in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username/Email</Label>
                  <Input
                    id="username"
                    placeholder="john123@xyz.com"
                    onInput={(e) => {
                      setSignin({ ...signin, email: e.currentTarget.value });
                    }}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onInput={(e) => {
                      setSignin({ ...signin, password: e.currentTarget.value });
                    }}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"secondary"}
                  onClick={async () => {
                    toast.promise(
                      axios.post(
                        `${import.meta.env.VITE_domain_uri}/api/doctors/login/docs/`,
                        signin
                      ),
                      {
                        loading: "Signing in...",
                        success: (response) => {
                          localStorage.setItem("token", response.data.token);
                          setDoctor(response.data.doctor);
                          navigate("/doctor-dashboard");
                          return "Signed in successfully!";
                        },
                        error: (response) => {
                          return response
                            ? response.message
                            : "Internal server error!";
                        },
                      }
                    );
                  }}
                >
                  SignIn
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
