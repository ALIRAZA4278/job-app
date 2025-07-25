// scripts/seedCompanies.js
// Run: node scripts/seedCompanies.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  location: String,
  logo: String,
  size: String,
  openPositions: Number,
  description: String,
  website: String,
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

const companies = [
  {
    name: 'TechNova',
    industry: 'Software',
    location: 'San Francisco, CA',
    logo: 'https://logo.clearbit.com/technova.com',
    size: '201-500',
    openPositions: 8,
    description: 'TechNova builds innovative SaaS solutions for modern businesses.',
    website: 'https://technova.com',
  },
  {
    name: 'HealthBridge',
    industry: 'Healthcare',
    location: 'New York, NY',
    logo: 'https://logo.clearbit.com/healthbridge.com',
    size: '501-1000',
    openPositions: 12,
    description: 'HealthBridge connects patients and providers with digital health tools.',
    website: 'https://healthbridge.com',
  },
  {
    name: 'EcoLogix',
    industry: 'Environmental',
    location: 'Austin, TX',
    logo: 'https://logo.clearbit.com/ecologix.com',
    size: '51-200',
    openPositions: 3,
    description: 'EcoLogix is dedicated to sustainable solutions for a greener planet.',
    website: 'https://ecologix.com',
  },
  {
    name: 'FinEdge',
    industry: 'Finance',
    location: 'Chicago, IL',
    logo: 'https://logo.clearbit.com/finedge.com',
    size: '1001-5000',
    openPositions: 20,
    description: 'FinEdge offers next-gen financial services and investment tools.',
    website: 'https://finedge.com',
  },
  {
    name: 'EduSpark',
    industry: 'Education',
    location: 'Boston, MA',
    logo: 'https://logo.clearbit.com/eduspark.com',
    size: '201-500',
    openPositions: 5,
    description: 'EduSpark empowers learners and educators with digital platforms.',
    website: 'https://eduspark.com',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Company.deleteMany({});
    await Company.insertMany(companies);
    console.log('Dummy companies seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
