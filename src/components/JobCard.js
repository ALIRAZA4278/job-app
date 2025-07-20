import React from 'react';

export default function JobCard({ job, onApply, onBookmark }) {
  const getPostedAgo = (date) => {
    if (!date) return '';
    const days = Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-6 space-y-4">
      
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-14 h-14 rounded-lg object-contain bg-gray-100"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-zinc-800 text-gray-500 font-bold text-xl">
              {job.companyName?.[0] || '?'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{job.jobTitle}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {job.companyName} • {job.location} • {job.jobType}
            </p>
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => onBookmark?.(job)}
          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          title="Save job"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v10.5m0 0L12 15.75m5.25 1.5L12 8.25m0 0L6.75 17.25m0-10.5v10.5" />
          </svg>
        </button>
      </div>

      {/* Salary */}
      {job.salaryMin && job.salaryMax && (
        <div className="text-blue-600 dark:text-blue-400 font-medium text-lg">
          PKR {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()} / month
        </div>
      )}

      {/* Skills */}
      {Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Experience & Category */}
      <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-2">
        <span>{job.experienceLevel}</span>
        <span>•</span>
        <span>{job.category}</span>
      </div>

      {/* Date Info */}
      <div className="text-xs text-gray-400 dark:text-gray-500 flex gap-2">
        <span>Posted {getPostedAgo(job.createdAt)}</span>
        {job.deadline && <span>• Deadline: {new Date(job.deadline).toLocaleDateString()}</span>}
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        {job.isTestRequired ? (
          <span className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            Requires Test
          </span>
        ) : (
          <span className="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            No Test Needed
          </span>
        )}

        {job.isVerified && (
          <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onApply?.(job)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Apply Now
        </button>

        {typeof job.matchScore === 'number' && (
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
            Match: {job.matchScore}%
          </span>
        )}
      </div>
    </div>
  );
}
