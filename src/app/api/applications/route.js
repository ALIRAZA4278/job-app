import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/mongodb";
import Application from "@/models/Application";
import User from "@/models/User";
import Job from "@/models/Job";

export async function GET(request) {
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
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    let query = {};
    
    if (user.role === "job_seeker") {
      query.applicant = user._id;
    } else if (user.role === "recruiter") {
      // Get applications for recruiter's jobs
      if (jobId) {
        const job = await Job.findById(jobId);
        if (job.recruiter.toString() !== user._id.toString()) {
          return NextResponse.json(
            { error: "Unauthorized" },
            { status: 403 }
          );
        }
        query.job = jobId;
      } else {
        const recruiterJobs = await Job.find({ recruiter: user._id });
        query.job = { $in: recruiterJobs.map(job => job._id) };
      }
    }

    const applications = await Application.find(query)
      .populate("job", "title company location type")
      .populate("applicant", "name email profile")
      .sort({ appliedAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    console.log("Auth userId:", userId); // Debugging log

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDB();
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user || user.role !== "job_seeker") {
      return NextResponse.json(
        { error: "Only job seekers can apply to jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: body.jobId,
      applicant: user._id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 }
      );
    }

    const application = new Application({
      job: body.jobId,
      applicant: user._id,
      coverLetter: body.coverLetter,
      resume: body.resume,
      customFields: body.customFields,
    });

    await application.save();

    // Add application to job
    await Job.findByIdAndUpdate(body.jobId, {
      $push: { applications: application._id },
    });

    const populatedApplication = await Application.findById(application._id)
      .populate("job", "title company location type")
      .populate("applicant", "name email profile");


    return NextResponse.json(populatedApplication, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
