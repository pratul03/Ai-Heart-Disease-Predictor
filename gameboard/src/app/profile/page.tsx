"use client"; // Mark as a Client Component

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UploadPhoto from "@/components/UploadPhoto"; // Import the Client Component

export default function ProfilePage() {
  const { data: session } = useSession(); // Get the user session
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const avatar = avatarUrl || (session.user?.image as string);

    try {
      // Call the API route to update the profile
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, avatar }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);

      // Optionally, show a success message or redirect
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Profile Page</h1>

      {/* Profile Update Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={session.user?.name || ""}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={session.user?.email || ""}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Avatar:</label>
          {/* Use the UploadPhoto component */}
          <UploadPhoto
            onUpload={(url) => {
              setAvatarUrl(url); // Update the avatar URL in state
            }}
          />
          <input
            type="hidden"
            id="avatar"
            name="avatar"
            value={avatarUrl || ""}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
