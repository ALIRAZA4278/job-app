import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDB();

    // Find the recruiter user by Clerk ID
    const recruiter = await (await import('@/models/User')).default.findOne({ clerkId: userId });
    if (!recruiter) {
      return NextResponse.json([], { status: 200 });
    }
    // Find jobs where recruiter matches user _id
    const jobs = await Job.find({ recruiter: recruiter._id }).sort({ createdAt: -1 });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching dashboard jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
// ALI RAZA