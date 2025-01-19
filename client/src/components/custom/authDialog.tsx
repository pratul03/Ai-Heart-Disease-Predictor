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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { doctorAtom, userAtom } from "@/store/atom/atom";

export function Auth({ label }: { label: string }) {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const setDoctor = useSetRecoilState(doctorAtom);

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    sex: "",
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">SignIn</TabsTrigger>
            <TabsTrigger value="password">SignUp</TabsTrigger>
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
                        "http://192.168.0.121:8080/api/auth/login",
                        signin
                      ),
                      {
                        loading: "Signing in...",
                        success: (response) => {
                          localStorage.setItem("token", response.data.token);
                          if (response.data.user.role === "user") {
                            setUser(response.data.user);
                            navigate("/dashboard");
                          } else if(response.data.user.role === "doctor") {
                            setDoctor(response.data.user);
                            navigate("/doctor-dashboard");
                          }

                          return "Signed in successfully!";
                        },
                        error: (response) => {
                          return response.data
                            ? response.data.message
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
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Enter your details to join our community.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    onInput={(e) => {
                      setSignup({ ...signup, name: e.currentTarget.value });
                    }}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john123@xyz.com"
                    onInput={(e) => {
                      setSignup({ ...signup, email: e.currentTarget.value });
                    }}
                    required
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="m-0.5">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="20-90"
                      onInput={(e) => {
                        setSignup({
                          ...signup,
                          age: parseInt(e.currentTarget.value),
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="m-0.5">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={(value) =>
                        setSignup({ ...signup, sex: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select your Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onInput={(e) => {
                      setSignup({ ...signup, password: e.currentTarget.value });
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
                        "http://192.168.0.121:8080/api/auth/signup",
                        signup
                      ),
                      {
                        loading: "Signing up...",
                        success: (response) => {
                          localStorage.setItem("token", response.data.token);
                          setUser(response.data.user);
                          navigate("/dashboard");
                          return "Account created successfully!";
                        },
                        error: (response) => {
                          return response.data
                            ? response.data.message
                            : "Internal server error!";
                        },
                      }
                    );
                  }}
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
