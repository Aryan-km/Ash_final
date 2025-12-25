/**
 * Admin Seed Script
 *
 * Creates a default admin user for the Interactive Physics Simulations Platform
 *
 * Admin Credentials:
 * - Email: admin@system.com
 * - Password: admin123
 * - Role: ADMIN
 *
 * Run with: npm run seed:admin
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/physics-simulations");
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@system.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("admin123", saltRounds);

    // Create the admin user
    const admin = new Admin({
      email: "admin@system.com",
      password: hashedPassword,
      role: "ADMIN"
    });

    // Save to database
    await admin.save();

    console.log("Admin user created successfully!");
    console.log("Email: admin@system.com");
    console.log("Password: admin123");
    console.log("Role: ADMIN");

  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

// Run the seed function
seedAdmin();
