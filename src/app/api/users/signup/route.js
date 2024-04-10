// Import necessary modules and functions
import { connectToDB } from "@/dbConfig/dbConfig"; // Function to connect to MongoDB
import User from "@/models/userModel"; // User model for interacting with user data
import { NextResponse, NextRequest } from "next/server"; // Next.js server response and request objects
import bcrypt from "bcryptjs"; // Module for hashing passwords
import { sendEmail } from "@/utils/mailer"; // Function for sending emails

// Connect to the MongoDB database
await connectToDB();

// Handler function for POST requests
export const POST = async (req) => {
  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = await req.json();

    // Check if a user with the provided email already exists
    const user = await User.findOne({ email });

    // If user exists, return a JSON response with an error message
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the provided password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log(savedUser); // Log the saved user to the console

    // Send verification email to the user
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Return a JSON response indicating successful user creation
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    // If any error occurs during the process, return a JSON response with the error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
