import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/mongodb";
import Application from "@/models/Application";
import Job from "@/models/Job";
import User from "@/models/User";

export async function POST(request, { params }) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Please sign in to apply for jobs" },
        { status: 401 }
      );
    }

    await connectToDB();
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "job_seeker") {
      return NextResponse.json(
        { error: "Only job seekers can apply for jobs" },
        { status: 403 }
      );
    }

    const job = await Job.findById(params.id);
    
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.status !== "active") {
      return NextResponse.json(
        { error: "This job is no longer accepting applications" },
        { status: 400 }
      );
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: params.id,
      applicant: user._id
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    const application = new Application({
      job: params.id,
      applicant: user._id,
      coverLetter: body.coverLetter || "",
      resume: body.resume || "",
      status: "pending"
    });

    await application.save();
    
    // Update job applications count
    await Job.findByIdAndUpdate(params.id, { 
      $inc: { applicationsCount: 1 } 
    });

    const populatedApplication = await Application.findById(application._id)
      .populate("applicant", "name email")
      .populate("job", "title company");

    return NextResponse.json(populatedApplication, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
