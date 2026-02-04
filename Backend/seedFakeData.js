// this file is to put fake data in mongodb so that we can use it to show on frontend and also build our project according to that
import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { User } from "./models/User.model.js";
import { Sales } from "./models/Sales.model.js";

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("✅ MongoDB connected");

    // clean old data
    await User.deleteMany();
    await Sales.deleteMany();

    // ===== USERS =====
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push(
        await User.create({
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: "password123",
          role: "User" // ✅ valid enum
        })
      );
    }

    console.log("✅ Users seeded:", users.length);

    // sales categories that u want to feed
    const categories = ["Electronics", "Clothing", "Food", "Books"];

    for (let i = 0; i < 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      await Sales.create({
        amount: faker.number.int({ min: 500, max: 5000 }),
        category: faker.helpers.arrayElement(categories),
        user: randomUser._id,
        createdAt: faker.date.between({
          from: "2024-01-01",
          to: "2024-12-31"
        })
      });
    }

    console.log("Sales seeded");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedData();
