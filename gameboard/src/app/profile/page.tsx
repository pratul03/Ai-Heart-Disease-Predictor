"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import UpdateProfile from "@/components/update-profile"; // Import the UpdateProfile component
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ marginBottom: "20px" }}>
            <label>Avatar:</label>
            <Image
              src={session.user?.avatar || ""}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Name:</label>
            <p>{session.user?.name}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Email:</label>
            <p>{session.user?.email}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Age:</label>
            <p>{session.user?.age || "Not provided"}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Gender:</label>
            <p>{session.user?.sex || "Not provided"}</p>
          </div>

          {/* Button to open the UpdateProfile component */}
          <UpdateProfile />
        </CardContent>
      </Card>
    </div>
  );
}
