import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(req: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, email, password, location, age, sex } = await req.json();

    // Validate required fields (name, email, password are required)
    if (!name || !email || !password || (!age && age > 0) || sex) {
      return NextResponse.json(
        { message: "Name, email, age, sex and password are required" },
        { status: 400, headers }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400, headers }
      );
    }

    // Create a new user with the provided data
    const newUser = new User({
      name,
      email,
      password,
      age,
      sex,
      ...(location && {
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude], // GeoJSON format
        },
      }),
    });

    // Save the user to the database
    await newUser.save();

    // Return the new user (excluding the password) and a success message
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
