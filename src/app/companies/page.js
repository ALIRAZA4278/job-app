'use client';


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Users, Briefcase, ExternalLink, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [jobsCompanies, setJobsCompanies] = useState([]);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    const allCompanies = mergeCompanies(companies, jobsCompanies);
    const filtered = allCompanies.filter(company => {
      const search = searchTerm;
      return (
        (typeof company.name === 'string' && company.name.includes(search)) ||
        (typeof company.industry === 'string' && company.industry.includes(search)) ||
        (typeof company.location === 'string' && company.location.includes(search))
      );
    });
    setFilteredCompanies(filtered);
  }, [searchTerm, companies, jobsCompanies]);

  // Fetch companies from /api/companies and jobs from /api/jobs, then merge
  const fetchAllCompanies = async () => {
    setLoading(true);
    try {
      const [companiesRes, jobsRes] = await Promise.all([
        fetch('/api/companies'),
        fetch('/api/jobs')
      ]);
      let companiesData = [];
      let jobsData = [];
      if (companiesRes.ok) {
        companiesData = await companiesRes.json();
      }
      if (jobsRes.ok) {
        jobsData = await jobsRes.json();
      }
      setCompanies(companiesData);
      setJobsCompanies(companiesFromJobs(jobsData));
    } catch (error) {
      console.error('Error fetching companies or jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper: extract companies from jobs array
  function companiesFromJobs(jobs) {
    if (!Array.isArray(jobs)) return [];
    const companyMap = {};
    jobs.forEach(job => {
      if (!job || !job.company) return;
      const name = job.company;
      if (!name) return;
      if (!companyMap[name]) {
        companyMap[name] = {
          _id: `job-company-${name}`,
          name,
          industry: job.industry || '',
          location: job.location || '',
          logo: job.companyLogo || '',
          size: job.companySize || '',
          openPositions: 0,
          description: job.companyDescription || '',
          website: job.companyWebsite || '',
          jobs: []
        };
      }
      companyMap[name].jobs.push(job);
      companyMap[name].openPositions += 1;
    });
    return Object.values(companyMap);
  }

  // Helper: merge companies from /api/companies and jobs
  function mergeCompanies(apiCompanies, jobsCompanies) {
    const map = {};
    apiCompanies.forEach(c => {
      if (!c || !c.name) return;
      map[c.name] = { ...c };
    });
    jobsCompanies.forEach(jc => {
      if (!jc || !jc.name) return;
      if (map[jc.name]) {
        // Merge jobs and openPositions
        map[jc.name].jobs = Array.isArray(map[jc.name].jobs)
          ? [...map[jc.name].jobs, ...(jc.jobs || [])]
          : (jc.jobs || []);
        map[jc.name].openPositions =
          (map[jc.name].openPositions || 0) + (jc.openPositions || 0);
        // Prefer logo/website/industry/location/description if missing
        ['logo','website','industry','location','description','size'].forEach(field => {
          if (!map[jc.name][field] && jc[field]) map[jc.name][field] = jc[field];
        });
      } else {
        map[jc.name] = { ...jc };
      }
    });
    return Object.values(map);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-16 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-4">
            Explore Companies
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Discover amazing companies that are hiring. Find your next opportunity
            with top employers across various industries.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies, industries, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 group"
            >
              {/* Company Logo */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mr-4">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black group-hover:text-blue-600 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-black">{company.industry}</p>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-black">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-black">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{company.size} employees</span>
                </div>
                <div className="flex items-center text-black">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{company.openPositions} open positions</span>
                </div>
              </div>

              {/* Company Description */}
              <p className="text-black text-sm mb-6 line-clamp-3">
                {company.description}
              </p>

              {/* Jobs List for this Company */}
              {Array.isArray(company.jobs) && company.jobs.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2 text-black">Open Jobs</h4>
                  <ul className="space-y-2">
                    {company.jobs.map((job) => (
                      <li key={job._id} className="flex items-center justify-between bg-gray-50 rounded px-2 py-1">
                        <div>
                          <span className="font-medium text-black">{job.jobTitle}</span>
                          <span className="ml-2 text-gray-500 text-xs">{job.location}</span>
                        </div>
                        <Link
                          href={`/jobs/${job._id}`}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          View
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4">
                <Link
                  href={`/jobs?company=${encodeURIComponent(company.name)}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                >
                  View All Jobs
                </Link>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCompanies.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              No companies found
            </h3>
            <p className="text-black">
              {searchTerm
                ? `No companies match "${searchTerm}". Try adjusting your search.`
                : 'No companies are currently listed.'}
            </p>
          </motion.div>
        )}

        {/* Stats Section */}
        {filteredCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-white rounded-lg shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              Company Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {companies.length}
                </div>
                <div className="text-black">Total Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {companies.reduce((sum, company) => sum + company.openPositions, 0)}
                </div>
                <div className="text-black">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {new Set(companies.map(company => company.industry)).size}
                </div>
                <div className="text-black">Industries</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
