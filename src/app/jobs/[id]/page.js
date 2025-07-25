"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal, Input, Button, Form } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "dotenv/config";
import {
  MapPin,
  Clock,
  Building,
  DollarSign,
  Calendar,
  Eye,
  Share2,
  Bookmark,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [form] = Form.useForm();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const { isSignedIn } = useAuth();
  const [showLoginError, setShowLoginError] = useState(false);

  const handleApplyJob = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      setShowLoginError(true);
      setTimeout(() => setShowLoginError(false), 3000);
    } 
  };
  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();

      if (response.ok) {
        setJob(data);
      } else {
        toast.error(data.error || "Failed to fetch job");
      }
    } catch (error) {
      toast.error("Failed to fetch job");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  // Web3Forms integration
  const handleApply = () => {
    setShowApplyModal(true);
  };

  const handleApplyForm = async (values) => {
    setApplying(true);
    try {
      // Find the best company email to send to
      const companyEmail =
        job?.contactEmail ||
        job?.companyEmail ||
        job?.company?.email ||
        job?.recruiterEmail ||
        "";
      if (!companyEmail) {
        toast.error("No company email found for this job.");
        setApplying(false);
        return;
      }
      // Build the message HTML
      const messageHtml = `
        <h2>New Job Application</h2>
        <p><strong>Job Title:</strong> ${job?.jobTitle}</p>
        <p><strong>Job ID:</strong> ${job?._id}</p>
        <p><strong>Applicant Name:</strong> ${values.name}</p>
        <p><strong>Applicant Email:</strong> ${values.email}</p>
        <p><strong>Clerk User ID:</strong> ${values.clerkId || ""}</p>
        <p><strong>Phone:</strong> ${values.phone || ""}</p>
        <p><strong>Skills:</strong> ${values.skills || ""}</p>
        <p><strong>Bio:</strong> ${values.bio || ""}</p>
        <p><strong>Education:</strong> ${values.education || ""}</p>
        <p><strong>Cover Letter:</strong><br/>${values.coverLetter || ""}</p>
      `;
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `New Application for ${job?.jobTitle}`,
          from_name: values.name,
          from_email: values.email,
          to: companyEmail,
          message: messageHtml,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Application sent successfully!");
        setShowApplyModal(false);
        setSubmittedData(values);
        setShowConfirmation(true);
        form.resetFields();
      } else {
        toast.error(data.error || "Failed to send application");
      }
    } catch (error) {
      toast.error("Failed to send application");
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (salary, salaryRange) => {
    if (salary && typeof salary === "object") {
      if (!salary.min && !salary.max) return "Competitive";
      if (salary.min && salary.max) {
        return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}/${salary.period || ""}`;
      }
      return `$${(salary.min || salary.max).toLocaleString()}/${salary.period || ""}`;
    }
    if (typeof salaryRange === "string" && salaryRange.trim() !== "") {
      return salaryRange;
    }
    if (typeof salary === "string" && salary.trim() !== "") {
      return salary;
    }
    return "Competitive";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Job Not Found
            </h1>
            <Link href="/jobs" className="text-blue-600 hover:text-blue-800">
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  {job.companyLogo &&
                    (() => {
                      try {
                        // Only render if src is a valid absolute URL or starts with /
                        const src = job.companyLogo;
                        if (
                          typeof src === "string" &&
                          (src.startsWith("http://") ||
                            src.startsWith("https://") ||
                            src.startsWith("/"))
                        ) {
                          return (
                            <Image
                              src={src}
                              alt={job.companyName}
                              width={64}
                              height={64}
                              className="rounded-lg"
                            />
                          );
                        }
                      } catch (e) {
                        // skip image if error
                      }
                      return null;
                    })()}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.jobTitle}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                      {job.companyName}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.jobType ? job.jobType.replace("-", " ") : "N/A"}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salaryMin?.toLocaleString()} -{" "}
                        {job.salaryMax?.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {job.views} views
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {Array.isArray(job.requiredSkills) &&
                  job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="whitespace-pre-wrap text-gray-700 mb-6">
                  {job.jobDescription}
                </div>
                {/* Add requirements/benefits if you add those fields to the schema */}
              </div>
              {/* Apply Now Button */}
              <div className="mt-8 flex justify-end">
                <span onClick={handleApplyJob}>
                  {showLoginError && (
                    <div className="mb-4 text-red-200 font-semibold">
                      Please log in or sign up before posting a job.
                    </div>
                  )}
                  <Button
                    type="primary"
                    style={{ background: "#2563eb", color: "#fff" }}
                    onClick={handleApply}
                  >
                    Apply Now
                  </Button>
                </span>
              </div>
              {/* Application Modal */}
              <Modal
                open={showApplyModal}
                onCancel={() => setShowApplyModal(false)}
                footer={null}
                title={`Apply for ${job.jobTitle}`}
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleApplyForm}
                  encType="multipart/form-data"
                >
                  <Form.Item
                    name="clerkId"
                    label="Clerk User ID"
                    initialValue={user?.id || ""}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name="name"
                    label="Your Name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                    initialValue={user?.fullName || ""}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Your Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                    initialValue={user?.primaryEmailAddress?.emailAddress || ""}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>
                  <Form.Item
                    name="skills"
                    label="Skills (comma separated)"
                    rules={[
                      { required: true, message: "Please enter your skills" },
                    ]}
                  >
                    <Input placeholder="e.g. React, Node.js, MongoDB" />
                  </Form.Item>
                  <Form.Item
                    name="resume"
                    label="Resume (PDF, DOC, DOCX)"
                    rules={[
                      { required: true, message: "Please upload your resume" },
                    ]}
                    valuePropName="fileList"
                  >
                    <Input type="file" accept=".pdf,.doc,.docx" />
                  </Form.Item>
                  <Form.Item name="bio" label="Bio">
                    <Input.TextArea
                      rows={3}
                      placeholder="Short bio about yourself"
                    />
                  </Form.Item>
                  <Form.Item name="education" label="Education">
                    <Input placeholder="Your education" />
                  </Form.Item>
                  <Form.Item
                    name="coverLetter"
                    label="Cover Letter"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a cover letter",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={5}
                      placeholder="Write your cover letter here..."
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={applying}
                      style={{
                        width: "100%",
                        background: "#2563eb",
                        color: "#fff",
                      }}
                    >
                      Submit Application
                    </Button>
                  </Form.Item>
                </Form>
                <h1>Contact Email: {job?.contactEmail}</h1>
              </Modal>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Job Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Job Type</span>
                  <p className="font-medium">
                    {job.jobType ? job.jobType.replace("-", " ") : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">
                    Experience Level
                  </span>
                  <p className="font-medium">{job.experienceLevel || "N/A"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{job.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Posted</span>
                  <p className="font-medium">{formatDate(job.createdAt)}</p>
                </div>
                {job.applicationDeadline && (
                  <div>
                    <span className="text-sm text-gray-500">
                      Application Deadline
                    </span>
                    <p className="font-medium">
                      {formatDate(job.applicationDeadline)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
