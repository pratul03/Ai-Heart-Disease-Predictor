"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-700 text-destructive-foreground hover:bg-destructive/90"
    >
      Logout
    </Button>
  );
}
