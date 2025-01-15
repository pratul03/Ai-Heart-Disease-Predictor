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
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/atom/atom";

export function Auth({ label }: { label: string }) {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
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
                    defaultValue="john123@xyz.com"
                    onInput={(e) => {
                      setSignin({ ...signin, email: e.currentTarget.value });
                    }}
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
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"secondary"}
                  onClick={async () => {
                    toast.promise(
                      axios.post(
                        "http://localhost:8080/api/auth/login",
                        signin
                      ),
                      {
                        loading: "Signing in...",
                        success: (response) => {
                          localStorage.setItem("token", response.data.token);
                          setUser(response.data.user);
                          navigate("/dashboard");
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
                    defaultValue={"John Doe"}
                    onInput={(e) => {
                      setSignup({ ...signup, name: e.currentTarget.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={"john123@xyz.com"}
                    onInput={(e) => {
                      setSignup({ ...signup, email: e.currentTarget.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onInput={(e) => {
                      setSignup({ ...signup, password: e.currentTarget.value });
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"secondary"}
                  onClick={async () => {
                    toast.promise(
                      axios.post(
                        "http://localhost:8080/api/auth/signup",
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
                          return response.data?response.data.message:"Internal server error!";
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
