import mongoose from 'mongoose';
import "dotenv/config";
import Job from '../src/models/Job.js';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aliraza:jobappzainali@job-app.ajs92ll.mongodb.net/";

const dummyJobs = [
  {
    jobTitle: "Frontend Developer",
    companyName: "TechCorp",
    companyLogo: "https://via.placeholder.com/100x100?text=TC",
    jobDescription: "Join our team to build modern web applications using React and Next.js.",
    jobType: "Full-time",
    experienceLevel: "Mid",
    category: "Software",
    requiredSkills: ["React", "Next.js", "JavaScript", "CSS"],
    location: "Remote",
    salaryMin: 60000,
    salaryMax: 90000,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    isTestRequired: false,
    openings: 2,
    contactEmail: "jobs@techcorp.com",
    recruiter: null, // Set to a valid User _id if needed
  },
  {
    jobTitle: "Backend Engineer",
    companyName: "InnovateLabs",
    companyLogo: "https://via.placeholder.com/100x100?text=IL",
    jobDescription: "Work on scalable backend systems with Node.js and MongoDB.",
    jobType: "Part-time",
    experienceLevel: "Senior",
    category: "Software",
    requiredSkills: ["Node.js", "MongoDB", "API Design"],
    location: "New York, NY",
    salaryMin: 80000,
    salaryMax: 120000,
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    isTestRequired: true,
    openings: 1,
    contactEmail: "careers@innovatelabs.com",
    recruiter: null,
  },
  {
    jobTitle: "UI/UX Designer",
    companyName: "CreativeStudio",
    companyLogo: "https://via.placeholder.com/100x100?text=CS",
    jobDescription: "Design beautiful and user-friendly interfaces for web and mobile.",
    jobType: "Contract",
    experienceLevel: "Junior",
    category: "Design",
    requiredSkills: ["Figma", "Sketch", "Adobe XD"],
    location: "San Francisco, CA",
    salaryMin: 50000,
    salaryMax: 70000,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    isTestRequired: false,
    openings: 1,
    contactEmail: "design@creativestudio.com",
    recruiter: null,
  }
];

async function seedJobs() {
  await mongoose.connect(MONGODB_URI);
  await Job.deleteMany({});
  await Job.insertMany(dummyJobs);
  console.log('Dummy jobs inserted!');
  process.exit(0);
}

seedJobs().catch(err => { console.error(err); process.exit(1); });
