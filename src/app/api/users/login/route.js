import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database.
await connectToDB();

// Define an asynchronous function named POST to handle HTTP POST requests.
export const POST = async (req) => {
  try {
    // Parse the request body as JSON.
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Find a user in the database with the provided email.
    const user = await User.findOne({ email });

    // If user is not found, return a JSON response indicating an error with status code 400 (Bad Request).
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Compare the provided password with the hashed password stored in the database.
    const validPassword = await bcryptjs.compare(password, user.password);

    // If the passwords don't match, return a JSON response indicating an error with status code 400.
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    // If authentication is successful, create a token containing user data.
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Sign the token with the provided secret and set expiration time to 1 day.
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Create a JSON response indicating successful login.
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });

    // Set the token as a cookie in the response with HTTPOnly flag for security.
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // Return the prepared response.
    return response;
  } catch (error) {
    // If an error occurs during execution, create a JSON response with the error message and HTTP status code 500 (Internal Server Error).
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
