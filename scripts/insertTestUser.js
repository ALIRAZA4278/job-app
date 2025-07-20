import mongoose from 'mongoose';
import "dotenv/config";
import User from '../src/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aliraza:jobappzainali@job-app.ajs92ll.mongodb.net/";

async function run() {
  await mongoose.connect(MONGODB_URI);
  // Replace with your actual Clerk user id and email
  const testUser = {
    clerkId: "user_test123", // <-- replace with your Clerk user.id
    email: "test@example.com",
    name: "Test Recruiter",
    role: "recruiter"
  };
  await User.create(testUser);
  console.log('Test user inserted!');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
