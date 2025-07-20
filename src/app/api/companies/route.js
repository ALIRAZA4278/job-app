import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET() {
  try {
    await connectToDatabase();

    // Aggregate companies from job postings
    const companiesData = await Job.aggregate([
      {
        $group: {
          _id: '$company',
          name: { $first: '$company' },
          openPositions: { $sum: 1 },
          locations: { $addToSet: '$location' },
          industries: { $addToSet: '$category' },
          salaryRanges: { $push: { min: '$salaryMin', max: '$salaryMax' } },
          jobs: { $push: '$$ROOT' }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          openPositions: 1,
          location: { $arrayElemAt: ['$locations', 0] }, // Take first location
          industry: { $arrayElemAt: ['$industries', 0] }, // Take first industry
          avgSalaryMin: { $avg: '$salaryRanges.min' },
          avgSalaryMax: { $avg: '$salaryRanges.max' },
          description: { $literal: 'A leading company in the industry, committed to innovation and excellence.' },
          size: { $literal: '100-500' },
          logo: { $literal: null },
          website: { $literal: null }
        }
      },
      {
        $sort: { openPositions: -1 }
      }
    ]);

    // Enhance company data with more realistic information
    const enhancedCompanies = companiesData.map((company, index) => {
      const companyEnhancements = {
        'TechCorp': {
          description: 'A leading technology company focused on innovative software solutions and digital transformation.',
          size: '500-1000',
          logo: 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=TC',
          website: 'https://techcorp.com',
          industry: 'Technology'
        },
        'InnovateLabs': {
          description: 'A cutting-edge research and development company specializing in AI and machine learning.',
          size: '100-500',
          logo: 'https://via.placeholder.com/64x64/10B981/FFFFFF?text=IL',
          website: 'https://innovatelabs.com',
          industry: 'Research & Development'
        },
        'DataDriven Inc': {
          description: 'Transforming businesses through data analytics and business intelligence solutions.',
          size: '200-500',
          logo: 'https://via.placeholder.com/64x64/8B5CF6/FFFFFF?text=DD',
          website: 'https://datadriven.com',
          industry: 'Data Analytics'
        },
        'CreativeStudio': {
          description: 'A full-service creative agency delivering exceptional design and marketing solutions.',
          size: '50-100',
          logo: 'https://via.placeholder.com/64x64/F59E0B/FFFFFF?text=CS',
          website: 'https://creativestudio.com',
          industry: 'Design & Marketing'
        },
        'CloudTech Solutions': {
          description: 'Providing enterprise cloud infrastructure and DevOps solutions for modern businesses.',
          size: '300-700',
          logo: 'https://via.placeholder.com/64x64/06B6D4/FFFFFF?text=CT',
          website: 'https://cloudtech.com',
          industry: 'Cloud Computing'
        }
      };

      const enhancement = companyEnhancements[company.name] || {
        description: `${company.name} is a dynamic company in the ${company.industry} sector, offering exciting career opportunities.`,
        size: ['50-100', '100-500', '500-1000', '1000+'][index % 4],
        logo: `https://via.placeholder.com/64x64/6B7280/FFFFFF?text=${company.name.charAt(0)}`,
        website: `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
        industry: company.industry
      };

      return {
        ...company,
        ...enhancement
      };
    });

    return NextResponse.json(enhancedCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}
