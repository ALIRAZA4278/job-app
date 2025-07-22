

"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function JobsPageContent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "",
    level: "",
    category: "",
    remote: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
  });

  const searchParams = useSearchParams();

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();

      if (response.ok) {
        setJobs(data.jobs);
        // If pagination is missing, set default values
        setPagination(data.pagination || {
          page: 1,
          limit: data.jobs ? data.jobs.length : 0,
          total: data.jobs ? data.jobs.length : 0,
          pages: 1
        });
      } else {
        toast.error(data.error || "Failed to fetch jobs");
      }
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    // Update filters from URL params
    const urlFilters = {
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      type: searchParams.get("type") || "",
      level: searchParams.get("level") || "",
      category: searchParams.get("category") || "",
      remote: searchParams.get("remote") === "true",
    };
    setFilters(urlFilters);
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSaveJob = async (jobId) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/save`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Job saved successfully!");
      } else {
        toast.error("Failed to save job");
      }
    } catch (error) {
      toast.error("Failed to save job");
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Job posted successfully!");
        setFormData({ title: "", description: "", location: "", type: "" });
        fetchJobs(); // Refresh job list
      } else {
        toast.error("Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Next Job
          </h1>
          <p className="text-gray-600">
            Discover thousands of job opportunities from top companies
          </p>
        </div>

        <JobFilters onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {jobs.length} of {pagination.total} jobs
              </p>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option>Most Recent</option>
                  <option>Most Relevant</option>
                  <option>Salary: High to Low</option>
                  <option>Salary: Low to High</option>
                </select>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-500 text-lg mb-4">
                  No jobs found matching your criteria
                </div>
                <p className="text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid gap-6 mb-8">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onSaveJob={handleSaveJob}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 text-sm rounded-md ${
                        page === pagination.page
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsPageContent />
    </Suspense>
  );
}
