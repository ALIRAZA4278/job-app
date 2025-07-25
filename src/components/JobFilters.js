"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Filter, 
  X, 
  ChevronDown,
  DollarSign,
  Building,
  Calendar,
  Zap,
  CheckCircle,
  Globe
} from "lucide-react";

export default function JobFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "",
    level: "",
    category: "",
    salaryMin: "",
    salaryMax: "",
    remote: false,
    verified: false,
    recentlyPosted: false,
    postedDate: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Count active filters
    const count = Object.entries(newFilters).filter(([k, v]) => {
      if (k === 'search' || k === 'location') return v !== "";
      if (typeof v === 'boolean') return v === true;
      return v !== "";
    }).length;
    
    setActiveFiltersCount(count);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      location: "",
      type: "",
      level: "",
      category: "",
      salaryMin: "",
      salaryMax: "",
      remote: false,
      verified: false,
      recentlyPosted: false,
      postedDate: "",
    };
    setFilters(clearedFilters);
    setActiveFiltersCount(0);
    onFilterChange(clearedFilters);
  };

  const quickFilters = [
    { key: 'remote', label: 'Remote', icon: Globe },
    { key: 'verified', label: 'Verified Companies', icon: CheckCircle },
    { key: 'recentlyPosted', label: 'Posted This Week', icon: Calendar },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-600" />
          Find Your Dream Job
        </h2>
        <div className="text-sm text-gray-500">
          {activeFiltersCount > 0 && `${activeFiltersCount} filters active`}
        </div>
      </div>

      {/* Main Search Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Search Input */}
        <div className="lg:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white/70 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        {/* Location Input */}
        <div className="lg:col-span-4 relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="City, state, or remote"
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white/70 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        {/* Filters Toggle */}
        <div className="lg:col-span-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
              showFilters || activeFiltersCount > 0
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {quickFilters.map((filter) => {
          const Icon = filter.icon;
          return (
            <motion.button
              key={filter.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange(filter.key, !filters[filter.key])}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filters[filter.key]
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </motion.button>
          );
        })}
      </div>

      {/* Extended Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 pt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Job Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Job Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Zap className="w-4 h-4 text-green-600" />
                  Experience Level
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                  value={filters.level}
                  onChange={(e) => handleFilterChange("level", e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead</option>
                  <option value="principal">Principal</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Building className="w-4 h-4 text-purple-600" />
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Web Design">Web Design</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="WordPress Development">WordPress Development</option>
                  <option value="E-commerce Development">E-commerce Development</option>
                  <option value="API Development">API Development</option>
                  <option value="Database Administration">Database Administration</option>
                  <option value="Web Security">Web Security</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="JavaScript Development">JavaScript Development</option>
                  <option value="React Development">React Development</option>
                  <option value="Node.js Development">Node.js Development</option>
                  <option value="Python Development">Python Development</option>
                  <option value="PHP Development">PHP Development</option>
                  <option value="SEO Specialist">SEO Specialist</option>
                </select>
              </div>

              {/* Posted Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Posted
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                  value={filters.postedDate}
                  onChange={(e) => handleFilterChange("postedDate", e.target.value)}
                >
                  <option value="">Any time</option>
                  <option value="today">Today</option>
                  <option value="3days">Last 3 days</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
            </div>

            {/* Salary Range */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 text-green-600" />
                Salary Range (PKR per month)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Minimum salary"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                    value={filters.salaryMin}
                    onChange={(e) => handleFilterChange("salaryMin", e.target.value)}
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Maximum salary"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                    value={filters.salaryMax}
                    onChange={(e) => handleFilterChange("salaryMax", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {activeFiltersCount > 0 ? `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied` : 'No filters applied'}
              </div>
              {activeFiltersCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
