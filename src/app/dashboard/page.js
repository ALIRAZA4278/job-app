"use client";
import "antd/dist/reset.css";
import { css } from '@emotion/css';
import JobPostModal from "@/components/JobPostModal";
import dayjs from "dayjs";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { 
  User, 
  Briefcase, 
  FileText, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,  
  XCircle,
  Search,
  Bell,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Filter,
  Download,
  Share2,
  MoreVertical
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchDashboardData();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch applications for job seekers or jobs for recruiters
      const [applicationsRes, jobsRes] = await Promise.all([
        fetch("/api/applications"),
        fetch("/api/dashboard") // Use dashboard API that filters by user ID
      ]);

      if (applicationsRes.ok) {
        const appData = await applicationsRes.json();
        setApplications(appData);
      }

      if (jobsRes.ok) {
        const jobData = await jobsRes.json();
        setJobs(jobData || []); // Dashboard API returns jobs directly, not wrapped in 'jobs' property
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (jobId) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    const jobToEdit = jobs.find(j => j._id === jobId);
    setEditJob(jobToEdit);
    setShowJobModal(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Job deleted successfully");
          setJobs(jobs.filter(job => job._id !== jobId));
        } else {
          toast.error("Failed to delete job");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-yellow-400 to-orange-400";
      case "reviewing":
        return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "interview":
        return "bg-gradient-to-r from-purple-400 to-purple-600";
      case "rejected":
        return "bg-gradient-to-r from-red-400 to-red-600";
      case "hired":
        return "bg-gradient-to-r from-green-400 to-green-600";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "reviewing":
        return <Eye className="h-4 w-4" />;
      case "interview":
        return <User className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "hired":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleJobFormSubmit = async (e, data) => {
    let payload;
    if (e && e.preventDefault) {
      // Create
      e.preventDefault();
      const formData = new FormData(e.target);
      const recruiterId = user?.id || "";
      const userId = user?.id || "";
      let requiredSkillsRaw = formData.get('requiredSkills');
      let requiredSkills = [];
      if (requiredSkillsRaw && typeof requiredSkillsRaw === 'string') {
        requiredSkills = requiredSkillsRaw.split(',').map(s => s.trim()).filter(Boolean);
      } else if (Array.isArray(requiredSkillsRaw)) {
        requiredSkills = requiredSkillsRaw;
      } else {
        requiredSkills = [];
      }
      payload = {
        userId,
        jobTitle: formData.get('jobTitle'),
        companyName: formData.get('companyName'),
        companyLogo: formData.get('companyLogo'),
        jobDescription: formData.get('jobDescription'),
        jobType: formData.get('jobType'),
        experienceLevel: formData.get('experienceLevel'),
        category: formData.get('category'),
        requiredSkills,
        location: formData.get('location'),
        salaryMin: Number(formData.get('salaryMin')),
        salaryMax: Number(formData.get('salaryMax')),
        deadline: formData.get('deadline'),
        isTestRequired: formData.get('isTestRequired') === 'on',
        openings: formData.get('openings'),
        contactEmail: formData.get('contactEmail'),
        recruiter: recruiterId,
        applyLink: formData.get('applyLink'),
      };
      try {
        const res = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success('Job posted successfully');
          setShowJobModal(false);
          setEditJob(null);
          fetchDashboardData();
        } else {
          const errorText = await res.text();
          console.error('Job post failed:', errorText);
          toast.error('Failed to post job');
        }
      } catch (err) {
        console.error('Error posting job:', err);
        toast.error('Error posting job');
      }
    } else if (data) {
      // Edit
      const userId = user?.id || "";
      payload = {
        ...data,
        userId,
        // Do NOT overwrite recruiter, keep original MongoDB _id
      };
      try {
        const res = await fetch(`/api/jobs/${data._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success('Job updated successfully');
          setShowJobModal(false);
          setEditJob(null);
          fetchDashboardData();
        } else {
          const errorText = await res.text();
          console.error('Job update failed:', errorText);
          toast.error('Failed to update job');
        }
      } catch (err) {
        console.error('Error updating job:', err);
        toast.error('Error updating job');
      }
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
                Welcome back, {user.firstName}! ✨
              </h1>
              <p className="text-black text-lg">
                Ready to take your career to the next level?
              </p>
            </div>
          </div>
        </div>

        {/* Modern Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 text-black       bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "applications", label: "Applications", icon: FileText },
              { id: "jobs", label: "My Jobs", icon: Briefcase },
              { id: "profile", label: "Profile", icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-allte text-white   ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "  hover:bg-white/50"
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: "Total Applications", 
                  value: applications.length, 
                  icon: FileText, 
                  gradient: "from-blue-500 to-cyan-500",
                  change: "+12%"
                },
                { 
                  label: "In Review", 
                  value: applications.filter(app => app.status === 'reviewing').length, 
                  icon: Eye, 
                  gradient: "from-green-500 to-emerald-500",
                  change: "+8%"
                },
                { 
                  label: "Interviews", 
                  value: applications.filter(app => app.status === 'interview').length, 
                  icon: Users, 
                  gradient: "from-purple-500 to-pink-500",
                  change: "+24%"
                },
                { 
                  label: "My Jobs", 
                  value: jobs.length, 
                  icon: Briefcase, 
                  gradient: "from-orange-500 to-red-500",
                  change: "+5%"
                }
              ].map((stat, index) => (
                <div key={index} className="group relative overflow-hidden">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-black mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                          <span className="text-xs text-black ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setShowJobModal(true)} className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all">
                  <Plus className="h-5 w-5 mr-2" />
                  Post New Job
                </button>
                <button className="flex items-center justify-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
                  <Search className="h-5 w-5 mr-2" />
                  Find Candidates
                </button>
                <button className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all">
                  <Star className="h-5 w-5 mr-2" />
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white transition-all">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {applications.length === 0 ? (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-black text-lg">No applications yet</p>
                  <p className="text-black">Start applying to jobs to see them here!</p>
                </div>
              ) : (
                applications.map((application) => (
                  <div key={application._id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                            <p className="text-black">{application.companyName}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-black">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(application.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Jobs</h2>
              <button 
                onClick={() => setShowJobModal(true)} 
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </button>
            </div>

            <div className="grid gap-6">
              {jobs.length === 0 ? (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-black text-lg">No jobs posted yet</p>
                  <p className="text-black">Create your first job posting to get started!</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job._id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-black">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                              {job.salaryMin && job.salaryMax && (
                                <span className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center mt-3">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                {job.applications?.length || 0} applications
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                      
                       
                        <button 
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-2 bg-gray-100 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <div className="bg-white/70 text-black backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                  <p className="text-black">{user.primaryEmailAddress?.emailAddress}</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">Change Avatar</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.fullName}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.primaryEmailAddress?.emailAddress}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Role</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black">
                    <option value="job_seeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-black placeholder-gray-400"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                    Save Changes
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-black rounded-xl hover:bg-gray-200 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <JobPostModal
          open={showJobModal}
          onClose={() => { setShowJobModal(false); setEditJob(null); }}
          onSubmit={handleJobFormSubmit}
          recruiterId={user?.id || ''}
          userId={user?.id || ''}
          editJob={editJob}
        />
      </div>
    </div>
  );
}
