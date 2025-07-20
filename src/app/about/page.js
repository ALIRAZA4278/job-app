"use client";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About JobBoard</h1>
        <p className="text-lg text-gray-700 mb-6">
          JobBoard is a modern job platform designed to connect top talent with leading companies. Our mission is to make job searching and hiring simple, transparent, and effective for everyone.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-700 mb-6">
          We believe in empowering job seekers and employers with the best tools and resources to find the perfect match. Whether you are looking for your next big opportunity or searching for the right candidate, JobBoard is here to help.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Curated job listings from top companies</li>
          <li>Easy application process</li>
          <li>Advanced filtering and search</li>
          <li>Secure and privacy-focused</li>
          <li>Support for both job seekers and recruiters</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
        <p className="text-gray-700">
          Have questions or feedback? Reach out to us at <a href="mailto:support@jobboard.com" className="text-blue-600 hover:underline">support@jobboard.com</a>.
        </p>
      </div>
    </div>
  );
}
