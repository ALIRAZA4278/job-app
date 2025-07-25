import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Calendar,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Star,
  Users
} from 'lucide-react';

export default function JobCard({ job, onApply, onBookmark, isBookmarked = false }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPostedAgo = (date) => {
    if (!date) return '';
    const days = Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days <= 7) return `${days} days ago`;
    if (days <= 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const formatSalary = (min, max) => {
    if (!min || !max) return null;
    const formatNumber = (num) => {
      if (num >= 100000) return `${(num / 100000).toFixed(0)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toLocaleString();
    };
    return `PKR ${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const getExperienceColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'entry':
      case 'junior':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'mid':
      case 'intermediate':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'senior':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'lead':
      case 'principal':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 overflow-hidden"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            {/* Company Logo */}
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                {job.companyLogo && !imageError ? (
                  <Image
                    src={job.companyLogo}
                    alt={job.companyName || 'Company Logo'}
                    width={64}
                    height={64}
                    className="w-14 h-14 rounded-lg object-contain"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <Building className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {job.isVerified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {job.jobTitle}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.companyName}</span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>
              
              {/* Job Type & Experience Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                  {job.jobType}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getExperienceColor(job.experienceLevel)}`}>
                  {job.experienceLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBookmark?.(job)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isBookmarked 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
            }`}
            title={isBookmarked ? 'Remove from saved' : 'Save job'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Salary Section */}
        {(job.salaryMin && job.salaryMax) && (
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-bold text-lg">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
            <span className="text-green-600 text-sm">/ month</span>
          </div>
        )}

        {/* Skills Section */}
        {Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Star className="w-4 h-4" />
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 6).map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium hover:shadow-sm transition-shadow duration-200"
                >
                  {skill}
                </motion.span>
              ))}
              {job.requiredSkills.length > 6 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                  +{job.requiredSkills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Posted {getPostedAgo(job.createdAt)}</span>
          </div>
          {job.deadline && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {job.isTestRequired ? (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              Assessment Required
            </div>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium">
              <CheckCircle className="w-4 h-4" />
              No Test Required
            </div>
          )}

          {job.applicantCount && (
            <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-medium">
              <Users className="w-4 h-4" />
              {job.applicantCount} applicants
            </div>
          )}

          {typeof job.matchScore === 'number' && job.matchScore > 70 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-200 rounded-lg text-xs font-medium">
              <Star className="w-4 h-4" />
              {job.matchScore}% Match
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <motion.a
            href={`/jobs/${job._id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
          >
            Apply Now
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`/jobs/${job._id}`, '_blank')}
            className="px-4 py-3 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-xl font-medium transition-all duration-200 hover:bg-blue-50"
            title="View details"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}
