// Importing mongoose library for database schema creation and management
import { mongoose } from "mongoose";

// Defining the schema for the user data
const userSchema = new mongoose.Schema({
  // Username field with String type, required and unique constraints
  username: {
    type: String,
    required: [true, "Please provide a username"], // Username is required, error message provided if not supplied
    unique: true, // Username must be unique, no duplicate usernames allowed
  },

  // Email field with String type, required and unique constraints
  email: {
    type: String,
    required: [true, "Please provide an email"], // Email is required, error message provided if not supplied
    unique: true, // Email must be unique, no duplicate emails allowed
  },

  // Password field with String type, required constraint
  password: {
    type: String,
    required: [true, "Please provide a password"], // Password is required, error message provided if not supplied
  },

  // isVerified field with Boolean type, default value set to false
  isVerified: {
    type: Boolean,
    default: false, // By default, users are not verified unless explicitly set to true
  },

  // isAdmin field with Boolean type, default value set to false
  isAdmin: {
    type: Boolean,
    default: false, // By default, users are not admins unless explicitly set to true
  },

  // forgotPasswordToken field with String type
  forgotPasswordToken: String, // Token used for password reset if forgotten

  // forgotPasswordTokenExpiry field with Date type
  forgotPasswordTokenExpiry: Date, // Expiry date/time for the password reset token

  // verifyToken field with String type
  verifyToken: String, // Token used for email verification

  // verifyTokenExpiry field with Date type
  verifyTokenExpiry: Date, // Expiry date/time for the email verification token
});

// Creating the User model if it doesn't already exist, or using the existing model
const User = mongoose.models.users || mongoose.model("users", userSchema);

// Exporting the User model for use in other parts of the application
export default User;
