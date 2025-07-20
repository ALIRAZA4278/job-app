
"use client";
import "antd/dist/reset.css";
import { css } from '@emotion/css';
import { Modal, Form, Input, Select, Checkbox, DatePicker, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
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
  XCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showJobModal, setShowJobModal] = useState(false);
  const [form] = Form.useForm();

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
    router.push(`/post-job?edit=${jobId}`);
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
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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



  const handleJobFormSubmit = async (values) => {
    try {
      // Map form values to backend schema
      const payload = {
        title: values.title,
        description: values.description,
        company: values.company, // string
        location: values.location,
        type: values.type,
        level: values.level,
        category: Array.isArray(values.category) ? values.category[0] : values.category, // string
        salaryRange: values.salaryRange || '',
        skillsRequired: Array.isArray(values.skillsRequired) ? values.skillsRequired.join(', ') : (values.skillsRequired || ''),
        testThreshold: values.testThreshold,
        contactEmail: values.contactEmail,
      };
      console.log('Submitting job payload:', payload);
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Job posted successfully');
        setShowJobModal(false);
        form.resetFields();
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
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600">
            Manage your job search and applications
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "applications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "jobs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">{applications.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">In Review</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {applications.filter(app => app.status === 'reviewing').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Interviews</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {applications.filter(app => app.status === 'interview').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Briefcase className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">My Jobs</p>
                  <p className="text-2xl font-semibold text-gray-900">{jobs.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {applications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No applications yet. Start applying to jobs!
                </div>
              ) : (
                applications.map((application) => (
                  <div key={application._id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.job?.title}
                        </h3>
                        <p className="text-gray-600">{application.job?.company?.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Applied on {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">My Jobs</h2>
              <button onClick={() => setShowJobModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {jobs.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No jobs posted yet. Create your first job posting!
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job._id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-gray-600">{job.location}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Posted on {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {job.applications?.length || 0} applications
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewJob(job._id)}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditJob(job._id)}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.fullName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.primaryEmailAddress?.emailAddress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="job_seeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Job Posting Modal (Ant Design) */}
        <Modal
          open={showJobModal}
          onCancel={() => setShowJobModal(false)}
          footer={null}
          width={1100}
          closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: 20 }} />}
          bodyStyle={{ background: '#18181b', color: '#fff', borderRadius: 16, padding: 40 }}
          style={{ top: 30 }}
        >
          <Form
            form={form}
            layout="horizontal"
            onFinish={handleJobFormSubmit}
            initialValues={{
              type: 'Full-time',
              level: 'Junior',
            }}
            style={{ display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'nowrap', alignItems: 'flex-start', justifyContent: 'center', width: '100%' }}
            className={css`
              .ant-input, .ant-select-selector, .ant-input-number, .ant-select-selection-item, .ant-select-selection-placeholder, .ant-input-affix-wrapper, .ant-picker-input > input {
                background: #23272a !important;
                color: #fff !important;
                border: 1px solid #444 !important;
                font-weight: bold;
                font-size: 16px;
              }
              .ant-input::placeholder, .ant-select-selection-placeholder, .ant-input-number-input::placeholder {
                color: #b0b0b0 !important;
                opacity: 1 !important;
              }
              .ant-select-dropdown {
                background: #23272a !important;
                color: #fff !important;
              }
              .ant-select-item-option-content {
                color: #fff !important;
              }
              .ant-input:focus, .ant-input-focused, .ant-select-focused .ant-select-selector, .ant-input-affix-wrapper-focused {
                border-color: #2563eb !important;
                box-shadow: 0 0 0 2px rgba(37,99,235,0.2) !important;
              }
              .ant-picker {
                background: #23272a !important;
                color: #fff !important;
                border: 1px solid #444 !important;
              }
              .ant-picker-input > input {
                color: #fff !important;
              }
              .ant-picker-dropdown {
                background: #23272a !important;
                color: #fff !important;
              }
            `}
          >
            <div style={{ flex: 1, minWidth: 340, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Please enter job title' }]}> 
                <Input placeholder="e.g. Frontend Developer (React)" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
              </Form.Item>
              <Form.Item name="company" label="Company Name" rules={[{ required: true, message: 'Please enter company name' }]}> 
                <Input placeholder="e.g. TechBridge Solutions" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
              </Form.Item>
              <Form.Item name="companyLogo" label="Company Logo" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList} extra="Optional">
                <Input type="file" accept="image/*" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16, padding: 8 }} />
              </Form.Item>
              <Form.Item name="contactEmail" label="Contact Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}> 
                <Input placeholder="For applicant replies or support" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
              </Form.Item>
              <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter location' }]}> 
                <Input placeholder="e.g. Remote / On-site / Hybrid - Karachi" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
              </Form.Item>
              <Form.Item name="type" label="Job Type" rules={[{ required: true, message: 'Please select job type' }]}> 
                <Select style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  <Select.Option value="Full-time">Full-time</Select.Option>
                  <Select.Option value="Part-time">Part-time</Select.Option>
                  <Select.Option value="Internship">Internship</Select.Option>
                  <Select.Option value="Contract">Contract</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="level" label="Experience Level" rules={[{ required: true, message: 'Please select level' }]}> 
                <Select style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  <Select.Option value="Junior">Junior</Select.Option>
                  <Select.Option value="Mid">Mid</Select.Option>
                  <Select.Option value="Senior">Senior</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter category' }]}> 
                <Select style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} mode="tags" placeholder="Web Development, MERN Stack, WordPress, etc." />
              </Form.Item>
            </div>
            <div style={{ flex: 1, minWidth: 340, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Form.Item label="Salary Range (PKR)">
                <Input.Group compact>
                  <Form.Item name="salaryMin" noStyle rules={[{ required: true, message: 'Min salary required' }]}> 
                    <Input type="number" min={0} placeholder="Min" style={{ width: 100, background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
                  </Form.Item>
                  <Input style={{ width: 30, background: '#23272a', color: '#fff', border: 'none', pointerEvents: 'none' }} placeholder="-" disabled />
                  <Form.Item name="salaryMax" noStyle rules={[{ required: true, message: 'Max salary required' }]}> 
                    <Input type="number" min={0} placeholder="Max" style={{ width: 100, background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
                  </Form.Item>
                  <Input style={{ width: 60, background: '#23272a', color: '#fff', border: 'none', pointerEvents: 'none' }} value="PKR" disabled />
                </Input.Group>
              </Form.Item>
              <Form.Item name="skillsRequired" label="Required Skills"> 
                <Select mode="tags" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} placeholder="React, Next.js, Tailwind, TypeScript, Figma" />
              </Form.Item>
              <Form.Item name="testRequired" label="Test Required?" valuePropName="checked">
                <Checkbox style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Yes</Checkbox>
              </Form.Item>
              <Form.Item name="description" label="Job Description" rules={[{ required: true, message: 'Please enter job description' }]}> 
                {/* Replace with a rich text editor like Quill or TinyMCE for production */}
                <Input.TextArea rows={6} placeholder="Detailed overview of role, responsibilities" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
              </Form.Item>
              <Form.Item name="applicationDeadline" label="Application Deadline">
                <DatePicker style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16, width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item name="openings" label="Number of Openings">
                <Input type="number" min={1} placeholder="e.g. 3" style={{ background: '#23272a', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 18, flexBasis: '100%', marginTop: 24 }}>
              <Button type="default" onClick={() => setShowJobModal(false)} style={{ padding: '12px 32px', background: '#23272a', color: '#fff', borderRadius: 6, fontWeight: 'bold', fontSize: 18, border: 'none' }}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ padding: '12px 32px', background: '#2563eb', color: '#fff', borderRadius: 6, fontWeight: 'bold', fontSize: 18, border: 'none' }}>Submit</Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
