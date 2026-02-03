import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Sales } from "./models/Sales.model.js";
import { User } from "./models/User.model.js";

try {
  // Connect to MongoDB
  await mongoose.connect(process.env.CONNECTION_URL);

  console.log("✅ MongoDB connected");

  // Pick any one user
  const user = await User.findOne();
  if (!user) {
    console.log("No user found. Please create at least 1 user first.");
    process.exit();
  }

  // Seed sales data
  const salesData = [
    { amount: 1200, category: "course", user: user._id },
    { amount: 800, category: "ebook", user: user._id },
    { amount: 2500, category: "course", user: user._id },
    { amount: 1500, category: "subscription", user: user._id }
  ];

  await Sales.insertMany(salesData);

  console.log("✅ Sales data seeded successfully");
  process.exit();

} catch (error) {
  console.error("❌ Error seeding sales:", error.message);
  process.exit(1);
}
