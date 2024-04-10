import nodemailer from "nodemailer"; // Module for sending emails
import User from "@/models/userModel"; // User model for interacting with user data
import bcryptjs from "bcryptjs"; // Module for hashing user IDs

// Function to send email for verification or password reset
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // Hash the user ID for security
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user data based on the type of email being sent
    if (emailType === "VERIFY") {
      // Update user's verify token and expiry for email verification
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // Token expiry time: 1 hour
      });
    } else if (emailType === "RESET") {
      // Update user's forgot password token and expiry for password reset
      await User.findByIdAndUpdateAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000, // Token expiry time: 10 minutes
      });
    }

    // Create email transport configuration
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP host
      port: 2525, // Mailtrap SMTP port
      auth: {
        user: "9735667c2b3478", // Mailtrap username
        pass: "3c04efc3cd90bf", // Mailtrap password
      },
    });

    // Define email content and options
    const mailOptions = {
      from: "kadamutkarsh21@gmail.com", // Sender email address
      to: email, // Recipient email address
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Email subject
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        // Email body with verification or reset link
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    // Send the email and wait for the response
    const mailresponse = await transport.sendMail(mailOptions);

    // Return the response from sending the email
    return mailresponse;
  } catch (error) {
    // If any error occurs during the process, throw an error with the error message
    throw new Error(error.message);
  }
};
