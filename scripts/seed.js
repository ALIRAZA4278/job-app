// Run this script to seed the database with sample jobs
// Usage: node scripts/seed.js

import mongoose from 'mongoose';
import "dotenv/config";



// Import models (adjust paths if needed)
import '../src/models/Job.js';
import '../src/models/User.js';
import '../src/models/Application.js';

const MONGODB_URI = process.env.MONGODB_URI;

const sampleJobs = [
  {
    jobTitle: "Senior React Developer",
    companyName: "TechCorp Solutions",
    companyLogo: "https://via.placeholder.com/100x100?text=TC",
    jobDescription: `We are looking for a skilled React Developer to join our team. You will be responsible for developing and maintaining web applications using React.js.\n\nKey Responsibilities:\n- Develop new user-facing features using React.js\n- Build reusable components and front-end libraries\n- Translate designs and wireframes into high-quality code\n- Optimize components for maximum performance across a vast array of web-capable devices and browsers\n\nRequirements:\n- Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model\n- Thorough understanding of React.js and its core principles\n- Experience with popular React.js workflows (such as Flux or Redux)\n- Familiarity with newer specifications of EcmaScript\n- Experience with data structure libraries (e.g., Immutable.js)`,
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Technology",
    requiredSkills: ["React", "JavaScript", "Redux", "HTML", "CSS", "Git"],
    location: "San Francisco, CA",
    salaryMin: 120000,
    salaryMax: 180000,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isTestRequired: true,
    openings: 2,
    contactEmail: "hr@techcorp.example.com",
    createdAt: new Date(),
  },
  {
    jobTitle: "Product Manager",
    companyName: "InnovateLabs",
    companyLogo: "https://via.placeholder.com/100x100?text=IL",
    jobDescription: `Join our product team to drive the strategy and execution of our core products. You'll work closely with engineering, design, and business teams to deliver exceptional user experiences.\n\nKey Responsibilities:\n- Define product vision and strategy\n- Manage product roadmap and prioritization\n- Conduct market research and competitive analysis\n- Work with cross-functional teams to deliver features\n- Analyze product metrics and user feedback\n\nRequirements:\n- 3+ years of product management experience\n- Strong analytical and problem-solving skills\n- Experience with agile development methodologies\n- Excellent communication and leadership skills\n- Data-driven decision making approach`,
    jobType: "Full-time",
    experienceLevel: "Mid",
    category: "Product",
    requiredSkills: ["Product Management", "Analytics", "Agile", "Leadership", "Strategy"],
    location: "New York, NY",
    salaryMin: 100000,
    salaryMax: 140000,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    isTestRequired: false,
    openings: 1,
    contactEmail: "jobs@innovatelabs.example.com",
    createdAt: new Date(),
  },
  {
    title: "Junior Full Stack Developer",
    description: `Great opportunity for a junior developer to join our growing team. You'll work on both frontend and backend technologies while learning from experienced developers.

Key Responsibilities:
- Develop web applications using modern technologies
- Collaborate with senior developers on feature implementation
- Write clean, maintainable code
- Participate in code reviews and team meetings
- Learn and adapt to new technologies

Requirements:
- 1-2 years of web development experience
- Knowledge of JavaScript, HTML, and CSS
- Familiarity with at least one backend language
- Understanding of database concepts
- Eagerness to learn and grow`,
    company: {
      name: "StartupXYZ",
      logo: "https://via.placeholder.com/100x100?text=SX",
      website: "https://startupxyz.example.com"
    },
    location: "Austin, TX",
    type: "full-time",
    level: "entry",
    category: "Technology",
    salary: {
      min: 65000,
      max: 85000,
      currency: "USD",
      period: "year"
    },
    requirements: [
      "1-2 years web development experience",
      "JavaScript proficiency",
      "Knowledge of HTML/CSS",
      "Basic understanding of databases",
      "Strong learning attitude"
    ],
    benefits: [
      "Health and dental insurance",
      "Flexible hours",
      "Professional development opportunities",
      "Startup equity",
      "Free snacks and drinks"
    ],
    skills: ["JavaScript", "HTML", "CSS", "Node.js", "React", "MongoDB"],
    remote: true,
    urgent: false,
    status: "active"
  },
  {
    title: "UX/UI Designer",
    description: `We're seeking a talented UX/UI Designer to create intuitive and visually appealing digital experiences for our users.

Key Responsibilities:
- Design user interfaces for web and mobile applications
- Conduct user research and usability testing
- Create wireframes, prototypes, and high-fidelity designs
- Collaborate with product managers and developers
- Maintain and evolve design systems

Requirements:
- 3+ years of UX/UI design experience
- Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)
- Strong portfolio showcasing design process
- Understanding of user-centered design principles
- Experience with responsive design`,
    company: {
      name: "DesignStudio Pro",
      logo: "https://via.placeholder.com/100x100?text=DS",
      website: "https://designstudio.example.com"
    },
    location: "Los Angeles, CA",
    type: "full-time",
    level: "mid",
    category: "Design",
    salary: {
      min: 85000,
      max: 120000,
      currency: "USD",
      period: "year"
    },
    requirements: [
      "3+ years UX/UI design experience",
      "Proficiency in Figma or Sketch",
      "Strong portfolio",
      "User research experience",
      "Responsive design knowledge"
    ],
    benefits: [
      "Creative workspace",
      "Design tool licenses",
      "Conference attendance budget",
      "Flexible work arrangements",
      "Health benefits package"
    ],
    skills: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research"],
    remote: true,
    urgent: false,
    status: "active"
  },
  {
    title: "Marketing Manager",
    description: `Lead our marketing efforts to drive brand awareness and customer acquisition. You'll develop and execute marketing strategies across multiple channels.

Key Responsibilities:
- Develop and implement marketing strategies
- Manage digital marketing campaigns
- Analyze marketing performance and ROI
- Collaborate with sales team on lead generation
- Oversee content creation and brand messaging

Requirements:
- 4+ years of marketing experience
- Experience with digital marketing tools
- Strong analytical skills
- Excellent written and verbal communication
- Leadership and project management skills`,
    company: {
      name: "GrowthCo",
      logo: "https://via.placeholder.com/100x100?text=GC",
      website: "https://growthco.example.com"
    },
    location: "Seattle, WA",
    type: "full-time",
    level: "mid",
    category: "Marketing",
    salary: {
      min: 80000,
      max: 110000,
      currency: "USD",
      period: "year"
    },
    requirements: [
      "4+ years marketing experience",
      "Digital marketing expertise",
      "Analytics and reporting skills",
      "Leadership experience",
      "Bachelor's degree in Marketing or related field"
    ],
    benefits: [
      "Performance bonuses",
      "Marketing conference attendance",
      "Flexible PTO",
      "Health and wellness benefits",
      "Professional development budget"
    ],
    skills: ["Digital Marketing", "Analytics", "Content Strategy", "SEO", "Social Media"],
    remote: false,
    urgent: false,
    status: "active"
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const Job = mongoose.model('Job');
    
    // Clear existing jobs (optional - remove this line if you want to keep existing data)
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Create a sample recruiter user
    const User = mongoose.model('User');
    let sampleRecruiter = await User.findOne({ email: 'recruiter@example.com' });
    
    if (!sampleRecruiter) {
      sampleRecruiter = new User({
        clerkId: 'sample_recruiter_id',
        email: 'recruiter@example.com',
        name: 'Sample Recruiter',
        role: 'recruiter',
        company: {
          name: 'Sample Company',
          description: 'A sample company for testing purposes',
          website: 'https://samplecompany.com',
          location: 'Remote',
          industry: 'Technology',
          size: '50-100'
        }
      });
      await sampleRecruiter.save();
      console.log('Created sample recruiter');
    }


    // Normalize all sample jobs to match Job schema fields
    const jobsWithRecruiter = sampleJobs.map(job => {
      // Fallbacks for alternate field names
      return {
        jobTitle: job.jobTitle || job.title || 'Untitled',
        jobDescription: job.jobDescription || job.description || '',
        companyName: job.companyName || (job.company && job.company.name) || 'Unknown',
        companyLogo: job.companyLogo || (job.company && job.company.logo) || '',
        jobType: job.jobType || job.type || 'Full-time',
        experienceLevel: job.experienceLevel || job.level || 'entry',
        category: job.category || '',
        requiredSkills: job.requiredSkills || job.skills || [],
        location: job.location || '',
        salaryMin: job.salaryMin || (job.salary && job.salary.min) || 0,
        salaryMax: job.salaryMax || (job.salary && job.salary.max) || 0,
        deadline: job.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isTestRequired: job.isTestRequired || false,
        openings: job.openings || 1,
        contactEmail: job.contactEmail || 'hr@example.com',
        createdAt: job.createdAt || new Date(),
        benefits: job.benefits || [],
        remote: job.remote || false,
        urgent: job.urgent || false,
        status: job.status || 'active',
        recruiter: sampleRecruiter._id,
        userId: 'user_30KAKDkXzbkV25kqPoMRaRIuSgg',
      };
    });

    // Insert sample jobs
    const createdJobs = await Job.insertMany(jobsWithRecruiter);
    console.log(`Created ${createdJobs.length} sample jobs`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
