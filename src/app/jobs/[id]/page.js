"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal, Input, Button, Form } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
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
  ArrowLeft
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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New Application for ${job?.title}`,
          from_name: values.name,
          from_email: values.email,
          to: job?.company?.email || job?.recruiterEmail || "",
          message: `A new job application has been received.\n\nJob Title: ${job?.title}\nJob ID: ${job?._id}\n\nApplicant Name: ${values.name}\nApplicant Email: ${values.email}\n\nCover Letter: ${values.coverLetter || ''}`,
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
        toast.error(data.message || "Failed to send application");
      }
    } catch (error) {
      toast.error("Failed to send application");
    } finally {
      setApplying(false);
    }
  };
      {/* Confirmation Modal */}
      <Modal
        open={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        footer={null}
        title="Application Submitted"
      >
        {submittedData && (
          <div>
            <p style={{ marginBottom: 12 }}>Thank you for applying! Here are your submitted details:</p>
            <div style={{ marginBottom: 8 }}><strong>Name:</strong> {submittedData.name}</div>
            <div style={{ marginBottom: 8 }}><strong>Email:</strong> {submittedData.email}</div>
            <div style={{ marginBottom: 8 }}><strong>Cover Letter:</strong></div>
            <div style={{ background: '#f3f4f6', padding: 12, borderRadius: 6, whiteSpace: 'pre-wrap' }}>{submittedData.coverLetter}</div>
          </div>
        )}
      </Modal>

  const formatSalary = (salary, salaryRange) => {
    if (salary && typeof salary === 'object') {
      if (!salary.min && !salary.max) return "Competitive";
      if (salary.min && salary.max) {
        return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}/${salary.period || ''}`;
      }
      return `$${(salary.min || salary.max).toLocaleString()}/${salary.period || ''}`;
    }
    if (typeof salaryRange === 'string' && salaryRange.trim() !== '') {
      return salaryRange;
    }
    if (typeof salary === 'string' && salary.trim() !== '') {
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
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
                  {job.company.logo && (
                    <Image
                      src={job.company.logo}
                      alt={job.company.name}
                      width={64}
                      height={64}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                      {job.company.name}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                        {job.remote && <span className="ml-1 text-green-600">(Remote)</span>}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type.replace('-', ' ')}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatSalary(job.salary, job.salaryRange)}
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
                {job.skills.map((skill, index) => (
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
                  {job.description}
                </div>

                {job.requirements && job.requirements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Apply for this job</h3>
              
              {job.applicationMethod === 'external' ? (
                <a
                  href={job.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Apply on Company Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              ) : (
                <Button
                  type="primary"
                  onClick={handleApply}
                  disabled={applying}
                  style={{ width: "100%", background: "#2563eb", color: "#fff" }}
                >
                  Apply Now
                </Button>
              )}
      {/* Application Modal */}
      <Modal
        open={showApplyModal}
        onCancel={() => setShowApplyModal(false)}
        footer={null}
        title={`Apply for ${job?.title}`}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleApplyForm}
        >
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: "Please enter your name" }]}
            initialValue={user?.fullName || ""}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Your Email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
            initialValue={user?.primaryEmailAddress?.emailAddress || ""}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="coverLetter"
            label="Cover Letter"
            rules={[{ required: true, message: "Please enter a cover letter" }]}
          >
            <Input.TextArea rows={5} placeholder="Write your cover letter here..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={applying} style={{ width: "100%", background: "#2563eb", color: "#fff" }}>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Modal>
              
              {!user && (
                <p className="text-sm text-gray-500 mt-2">
                  You must be signed in to apply for jobs
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Job Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Job Type</span>
                  <p className="font-medium">{job.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Experience Level</span>
                  <p className="font-medium">{job.level}</p>
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
                    <span className="text-sm text-gray-500">Application Deadline</span>
                    <p className="font-medium">{formatDate(job.applicationDeadline)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
