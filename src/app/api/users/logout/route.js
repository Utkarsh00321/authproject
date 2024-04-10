import { NextResponse } from "next/server";

// Define an asynchronous function named GET to handle HTTP GET requests.
export async function GET() {
  try {
    // Create a JSON response with a success message indicating successful logout.
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Set a cookie named "token" with an empty value and options for security and expiration.
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    // Return the prepared response.
    return response;
  } catch (error) {
    // If an error occurs during execution, create a JSON response with the error message and HTTP status code 500 (Internal Server Error).
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
