import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import Application from "@/models/Application";

export async function GET(request, context) {
  try {
    await connectToDB();

    const { params } = context;
    const job = await Job.findById(params.id)
      .populate("createdBy", "name email company");

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Increment view count
    await Job.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDB();
    
    const user = await User.findOne({ clerkId: userId });
    const job = await Job.findById(params.id);

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.recruiter.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "You can only edit your own jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    const updatedJob = await Job.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    ).populate("recruiter", "name email company");

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDB();
    
    const user = await User.findOne({ clerkId: userId });
    const job = await Job.findById(params.id);

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.recruiter.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "You can only delete your own jobs" },
        { status: 403 }
      );
    }

    await Job.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
