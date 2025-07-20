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

    const jobs = await Job.find({ clerkId: userId }).sort({ createdAt: -1 });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching dashboard jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
