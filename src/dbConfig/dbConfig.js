import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectToDB = async () => {
  try {
    // Connect to MongoDB using the provided URI from environment variables
    mongoose.connect(process.env.MONGO_URI, {
      dbName: "test",
    });

    // Get the connection instance
    const connection = mongoose.connection;

    // Event listener for successful connection
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    // Event listener for connection error
    connection.on("error", (error) => {
      console.log("Error in connecting to MongoDB: " + error);
      process.exit; // Terminate the process if connection fails
    });
  } catch (error) {
    // Catch any errors that occur during the connection process
    console.log("Something went wrong while connecting to the database");
    console.log(error);
  }
};
