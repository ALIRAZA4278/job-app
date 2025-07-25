"use client";

import Link from "next/link";
import { Search, Briefcase, Users, TrendingUp, ArrowRight, CheckCircle, Star, Globe, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [showLoginError, setShowLoginError] = useState(false);

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      setShowLoginError(true);
      setTimeout(() => setShowLoginError(false), 3000);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                #1 Job Platform
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Find Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Dream Job
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with top companies worldwide and discover opportunities that match your skills. 
                Join millions of professionals who found their perfect career.
              </p>
              
              {showLoginError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">Please log in or sign up before posting a job.</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Browse Jobs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button
                  onClick={handlePostJob}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  Post a Job
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  1M+ Job Seekers
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  50K+ Companies
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  100% Secure
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main illustration container */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  {/* Mock job cards */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Senior Developer</h4>
                      <p className="text-sm text-gray-500">TechCorp • Remote</p>
                    </div>
                    <div className="text-green-600 font-semibold">$120k</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Product Manager</h4>
                      <p className="text-sm text-gray-500">StartupXYZ • New York</p>
                    </div>
                    <div className="text-green-600 font-semibold">$140k</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">UI/UX Designer</h4>
                      <p className="text-sm text-gray-500">Design Studio • Remote</p>
                    </div>
                    <div className="text-green-600 font-semibold">$95k</div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Star className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobBoard?
            </h2>
          </div>
          
          <div className="space-y-20">
            {/* Feature 1 - Quality Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                {/* Quality Jobs Illustration */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-full h-64 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center relative">
                      {/* Computer Screen */}
                      <div className="bg-gray-800 rounded-lg p-3 w-48 h-32 relative">
                        <div className="bg-white rounded-md h-full flex flex-col">
                          <div className="bg-red-500 h-2 rounded-t-md"></div>
                          <div className="flex-1 p-2 space-y-1">
                            <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                            <div className="bg-gray-200 h-2 rounded w-1/2"></div>
                            <div className="bg-red-200 h-2 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                      {/* Person Figure */}
                      <div className="absolute right-4 bottom-4">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <div className="w-6 h-12 bg-blue-600 rounded-lg mx-auto mt-1"></div>
                        <div className="flex space-x-1 mt-1">
                          <div className="w-2 h-6 bg-gray-700 rounded"></div>
                          <div className="w-2 h-6 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      {/* Magnifying Glass */}
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 border-4 border-red-500 rounded-full relative">
                          <div className="absolute -bottom-2 -right-2 w-4 h-1 bg-red-500 rounded rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-red-400 rounded-full opacity-30"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 bg-orange-400 rounded-full opacity-40"></div>
                  <div className="absolute top-12 right-12 w-4 h-4 bg-red-300 rounded-full opacity-50"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">QUALITY JOBS</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Test interfaces, interaction flows, iconography and more, to help you create intuitive and delightful experiences for your users.
                </p>
              </div>
            </div>

            {/* Feature 2 - Easy Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 relative">
                {/* Easy Applications Illustration */}
                <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl flex items-center justify-center relative">
                      {/* Mobile Phone */}
                      <div className="bg-gray-800 rounded-xl p-2 w-32 h-56 relative">
                        <div className="bg-white rounded-lg h-full flex flex-col">
                          <div className="bg-red-500 h-8 rounded-t-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="flex-1 p-2 space-y-2">
                            {[1,2,3,4,5].map((item) => (
                              <div key={item} className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-pink-300 rounded-full"></div>
                                <div className="flex-1 space-y-1">
                                  <div className="bg-gray-200 h-1 rounded w-full"></div>
                                  <div className="bg-gray-100 h-1 rounded w-2/3"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-red-500 h-6 rounded-b-lg flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      {/* Person with phone */}
                      <div className="absolute right-8 bottom-8">
                        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                        <div className="w-8 h-16 bg-red-500 rounded-lg mx-auto mt-1 relative">
                          <div className="absolute -right-2 top-2 w-3 h-6 bg-gray-800 rounded"></div>
                        </div>
                        <div className="flex space-x-1 mt-1">
                          <div className="w-2 h-8 bg-gray-700 rounded"></div>
                          <div className="w-2 h-8 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      {/* Floating icons */}
                      <div className="absolute top-6 left-8 w-6 h-6 bg-pink-400 rounded-lg opacity-60"></div>
                      <div className="absolute top-16 right-4 w-4 h-4 bg-red-400 rounded-full opacity-70"></div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-6 h-6 bg-pink-400 rounded-full opacity-30"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-red-400 rounded-full opacity-40"></div>
                  <div className="absolute top-16 left-12 w-4 h-4 bg-pink-300 rounded-full opacity-50"></div>
                </div>
              </div>
              
              <div className="lg:order-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">EASY APPLICATIONS</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Fine-tune landing pages, messaging, and creative, helping you optimise conversion rates on marketing campaigns and product launches.
                </p>
              </div>
            </div>

            {/* Feature 3 - Career Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                {/* Career Growth Illustration */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center relative">
                      {/* Growth Chart */}
                      <div className="relative w-48 h-32">
                        {/* Chart bars */}
                        <div className="absolute bottom-0 left-4 w-6 h-12 bg-red-400 rounded-t"></div>
                        <div className="absolute bottom-0 left-12 w-6 h-16 bg-red-500 rounded-t"></div>
                        <div className="absolute bottom-0 left-20 w-6 h-20 bg-red-600 rounded-t"></div>
                        <div className="absolute bottom-0 left-28 w-6 h-24 bg-red-700 rounded-t"></div>
                        
                        {/* Arrow */}
                        <div className="absolute top-4 right-8 w-12 h-1 bg-red-500 transform rotate-12">
                          <div className="absolute -right-1 -top-1 w-0 h-0 border-l-4 border-b-2 border-t-2 border-l-red-500 border-b-transparent border-t-transparent"></div>
                        </div>
                        
                        {/* Dollar sign */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          $
                        </div>
                      </div>
                      
                      {/* Person jumping */}
                      <div className="absolute right-4 bottom-4">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <div className="w-6 h-12 bg-blue-600 rounded-lg mx-auto mt-1 transform -rotate-12"></div>
                        <div className="flex space-x-2 mt-1 transform rotate-12">
                          <div className="w-2 h-6 bg-gray-700 rounded transform -rotate-45"></div>
                          <div className="w-2 h-6 bg-gray-700 rounded transform rotate-45"></div>
                        </div>
                        {/* Arms up */}
                        <div className="absolute top-8 -left-2 w-2 h-4 bg-gray-700 rounded transform -rotate-45"></div>
                        <div className="absolute top-8 -right-2 w-2 h-4 bg-gray-700 rounded transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-6 h-6 bg-blue-400 rounded-full opacity-30"></div>
                  <div className="absolute bottom-8 left-8 w-8 h-8 bg-purple-400 rounded-full opacity-40"></div>
                  <div className="absolute top-12 left-16 w-4 h-4 bg-blue-300 rounded-full opacity-50"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">CAREER GROWTH</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ensure you&apos;re delivering the right features to the right customers by validating product concepts with your target audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join the largest professional network and accelerate your career
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-2">
                  10K+
                </div>
                <div className="text-gray-600 font-medium">Active Jobs</div>
                <div className="w-full h-2 bg-blue-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-green-200">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700 mb-2">
                  5K+
                </div>
                <div className="text-gray-600 font-medium">Companies</div>
                <div className="w-full h-2 bg-green-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-700 mb-2">
                  50K+
                </div>
                <div className="text-gray-600 font-medium">Job Seekers</div>
                <div className="w-full h-2 bg-purple-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 mb-2">
                  95%
                </div>
                <div className="text-gray-600 font-medium">Success Rate</div>
                <div className="w-full h-2 bg-orange-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Verified Companies</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">5-Star Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Join Today
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Take the Next Step in Your
              <span className="block text-yellow-300">Career Journey?</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join millions of professionals who have found their dream jobs through our platform. 
              Your perfect opportunity is waiting for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/jobs"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Browse 100K+ Jobs
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <button
                onClick={handlePostJob}
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Post Your Job
                <Briefcase className="ml-2 w-5 h-5" />
              </button>
            </div>
            
            {/* Additional CTA elements */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">100% Free to Join</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6" />
                <span className="text-xl font-bold">JobBoard</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect job opportunity.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">My Applications</Link></li>
                <li><Link href="/profile" className="hover:text-white">My Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white">Post Jobs</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Manage Jobs</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">View Applications</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
