import { NextResponse } from 'next/server';

import Job from '@/models/Job';
import Company from '@/models/Company';
import connectToDB from '@/lib/mongodb';

export async function GET() {
  await connectToDB();
  const companies = await Company.find({}).lean();
  const companiesWithJobs = await Promise.all(companies.map(async (company) => {
    const jobs = await Job.find({ company: company.name }).lean();
    return {
      ...company,
      jobs,
      openPositions: jobs.length
    };
  }));
  return NextResponse.json(companiesWithJobs);
}
