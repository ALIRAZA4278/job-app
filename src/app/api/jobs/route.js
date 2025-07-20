import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import User from '@/models/User';

// Next.js API Route for /api/jobs
export async function GET(request) {
  await dbConnect();
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  return new Response(JSON.stringify({ jobs }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    // Find the user by Clerk ID (from recruiter field)
    let user = await User.findOne({ clerkId: body.recruiter });
    if (!user) {
      // Create a new user with minimal info if not found
      user = await User.create({
        clerkId: body.recruiter,
        email: body.contactEmail || '',
        name: body.companyName || 'Recruiter',
        role: 'recruiter',
      });
    }
    const job = await Job.create({
      jobTitle: body.jobTitle,
      companyName: body.companyName,
      companyLogo: body.companyLogo,
      jobDescription: body.jobDescription,
      jobType: body.jobType,
      experienceLevel: body.experienceLevel,
      category: body.category,
      requiredSkills: body.requiredSkills ? body.requiredSkills.split(',').map(s => s.trim()) : [],
      location: body.location,
      salaryMin: body.salaryMin,
      salaryMax: body.salaryMax,
      deadline: body.deadline ? new Date(body.deadline) : undefined,
      isTestRequired: !!body.isTestRequired,
      openings: body.openings,
      contactEmail: body.contactEmail,
      recruiter: user._id,
    });
    return new Response(JSON.stringify({ message: 'Job created', data: job }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create job', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
