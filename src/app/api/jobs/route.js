import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import User from '@/models/User';

// Next.js API Route for /api/jobs
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    // Search filter
    const search = searchParams.get('search');
    if (search) {
      filter.$or = [
        { jobTitle: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { jobDescription: { $regex: search, $options: 'i' } },
        { requiredSkills: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Location filter
    const location = searchParams.get('location');
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    // Job type filter
    const type = searchParams.get('type');
    if (type) {
      filter.jobType = type;
    }
    
    // Experience level filter
    const level = searchParams.get('level');
    if (level) {
      filter.experienceLevel = level;
    }
    
    // Category filter
    const category = searchParams.get('category');
    if (category) {
      filter.category = category;
    }
    
    // Remote filter
    const remote = searchParams.get('remote');
    if (remote === 'true') {
      filter.$or = filter.$or ? [
        ...filter.$or,
        { location: { $regex: 'remote', $options: 'i' } }
      ] : [
        { location: { $regex: 'remote', $options: 'i' } }
      ];
    }
    
    // Salary filters
    const salaryMin = searchParams.get('salaryMin');
    const salaryMax = searchParams.get('salaryMax');
    if (salaryMin || salaryMax) {
      filter.salaryMin = {};
      if (salaryMin) filter.salaryMin.$gte = parseInt(salaryMin);
      if (salaryMax) filter.salaryMax = { $lte: parseInt(salaryMax) };
    }
    
    // Recently posted filter
    const recentlyPosted = searchParams.get('recentlyPosted');
    if (recentlyPosted === 'true') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filter.createdAt = { $gte: oneWeekAgo };
    }
    
    // Posted date filter
    const postedDate = searchParams.get('postedDate');
    if (postedDate) {
      const now = new Date();
      let dateFilter;
      
      switch (postedDate) {
        case 'today':
          dateFilter = new Date();
          dateFilter.setHours(0, 0, 0, 0);
          break;
        case '3days':
          dateFilter = new Date();
          dateFilter.setDate(dateFilter.getDate() - 3);
          break;
        case 'week':
          dateFilter = new Date();
          dateFilter.setDate(dateFilter.getDate() - 7);
          break;
        case 'month':
          dateFilter = new Date();
          dateFilter.setMonth(dateFilter.getMonth() - 1);
          break;
      }
      
      if (dateFilter) {
        filter.createdAt = { $gte: dateFilter };
      }
    }
    
    // Get total count for pagination
    const total = await Job.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    
    // Handle sorting
    const sort = searchParams.get('sort') || 'recent';
    let sortObject = {};
    
    switch (sort) {
      case 'recent':
        sortObject = { createdAt: -1 };
        break;
      case 'oldest':
        sortObject = { createdAt: 1 };
        break;
      case 'salary_high':
        sortObject = { salaryMax: -1, salaryMin: -1 };
        break;
      case 'salary_low':
        sortObject = { salaryMin: 1, salaryMax: 1 };
        break;
      case 'alphabetical':
        sortObject = { jobTitle: 1 };
        break;
      case 'relevant':
        // For relevance, we can sort by a combination of factors
        sortObject = { createdAt: -1 }; // Default to recent for now
        break;
      default:
        sortObject = { createdAt: -1 };
    }
    
    // Fetch jobs with filters, sorting, and pagination
    const jobs = await Job.find(filter)
      .populate('recruiter', 'name email')
      .sort(sortObject)
      .skip(skip)
      .limit(limit);
    
    return new Response(JSON.stringify({ 
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch jobs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
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
      userId: body.userId || '',
      jobTitle: body.jobTitle,
      companyName: body.companyName,
      companyLogo: body.companyLogo,
      jobDescription: body.jobDescription,
      jobType: body.jobType,
      experienceLevel: body.experienceLevel,
      category: body.category,
      requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : [],
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
