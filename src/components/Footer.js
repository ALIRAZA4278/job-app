"use client";

import Link from "next/link";
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Heart,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Star
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Top Section */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - CTA */}
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  Ready to find your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    dream job?
                  </span>
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Join thousands of professionals who have already found their perfect career match.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/jobs"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Browse Jobs
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-blue-500 hover:text-white transition-all duration-300"
                  >
                    Post a Job
                  </Link>
                </div>
              </div>

              {/* Right Side - Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
                  <div className="text-gray-400">Active Jobs</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-purple-400 mb-2">5K+</div>
                  <div className="text-gray-400">Companies</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">50K+</div>
                  <div className="text-gray-400">Job Seekers</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">JobBoard</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner in connecting talent with opportunity. 
                We&apos;re revolutionizing the way people find their dream careers.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>support@jobboard.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* For Job Seekers */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                For Job Seekers
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/jobs" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    My Applications
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/career-advice" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Career Advice
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                For Employers
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Manage Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    View Applications
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/employer-guide" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Employer Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-400" />
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400">
                <span>&copy; {currentYear} JobBoard.</span>
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>for job seekers worldwide.</span>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Trusted by 1M+</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <Link 
                  href="https://facebook.com" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                >
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link 
                  href="https://twitter.com" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors duration-300 group"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
