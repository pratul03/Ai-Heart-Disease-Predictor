"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import UploadPhoto from "@/components/UploadPhoto";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function UpdateProfile() {
  const { data: session, update } = useSession();

  if (!session) {
    redirect("/login");
  }

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState<string>(session?.user?.age?.toString() || "");
  const [sex, setSex] = useState<string>(session?.user?.sex || "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const avatar = avatarUrl || (session.user?.image as string);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, avatar, age, sex }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);

      // Refresh the session to reflect changes immediately
      await update({
        ...session,
        user: {
          ...session.user,
          name,
          email,
          avatar,
          age: parseInt(age), // Convert age back to a number for the session
          sex,
        },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button>Update Profile</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label>Avatar:</label>
            <Image
              src={
                avatarUrl ||
                session.user?.avatar ||
                "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar3_h74xpz.png"
              }
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
            <UploadPhoto
              onUpload={(url) => {
                setAvatarUrl(url);
              }}
            />
            <input
              type="hidden"
              id="avatar"
              name="avatar"
              value={avatarUrl || ""}
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="name">Name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={session?.user?.name || ""}
              className="mt-1"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={session?.user?.email || ""}
              className="mt-1"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                defaultValue="********"
                className="mt-1 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="age">Age:</label>
            <Input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="sex">Gender:</label>
            <Input
              type="text"
              id="sex"
              name="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="col-span-2">
            <Button type="submit" className="mt-4 w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
