import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database.
await connectToDB();

// Define an asynchronous function named POST to handle HTTP POST requests.
export const POST = async (req) => {
  try {
    // Parse the request body as JSON.
    const reqBody = await req.json();
    const { token } = reqBody;

    // Find a user in the database with the provided verification token and valid expiry date.
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // If user is not found or token is expired, return a JSON response indicating an error with status code 400 (Bad Request).
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update the user's properties to mark them as verified and remove verification token details.
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    // Return a JSON response indicating successful verification.
    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 500 }
    );
  } catch (error) {
    // If an error occurs during execution, return a JSON response with the error message and HTTP status code 500 (Internal Server Error).
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
