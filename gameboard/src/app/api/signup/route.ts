import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, email, password, location } = await req.json();

    // Validate required fields (name, email, password are required)
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided data
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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
