import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in to update your profile." },
        { status: 401 }
      );
    }

    // Parse the request body
    const { name, email, avatar } = await request.json();

    // Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      session.user?.id,
      { name, email, avatar },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile." },
      { status: 500 }
    );
  }
}
