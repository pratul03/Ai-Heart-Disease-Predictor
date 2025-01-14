import mongoose from "mongoose";
import User from "@/models/User";

interface UpdateUserProfileParams {
  userId: string;
  updates: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

export async function updateUserProfile(
  userId: string,
  updates: UpdateUserProfileParams["updates"]
) {
  try {
    // Connect to the database directly
    const MONGODB_URI = process.env.MONGODB_URI!;

    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    if (mongoose.connection.readyState === 0) {
      // If not connected, establish a new connection
      await mongoose.connect(MONGODB_URI);
    }

    // Update the user profile using Mongoose
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
