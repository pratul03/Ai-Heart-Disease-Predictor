import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function GET() {
  let client;

  try {
    // Connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();

    // Access the database and collection
    const database = client.db("test"); 
    const collection = database.collection("users");
    // Fetch all users from the collection
    const users = await collection.find({}).toArray();

    // Return the users as a JSON response
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
