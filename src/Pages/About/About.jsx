import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Empowering students worldwide to achieve their educational dreams through accessible scholarship opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To democratize access to higher education by connecting deserving students with scholarship opportunities 
              that match their academic goals, financial needs, and personal aspirations. We believe every student 
              deserves the chance to pursue their dreams without financial barriers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-indigo-600">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the world's most trusted and comprehensive scholarship platform, where every qualified student 
              can find funding opportunities that perfectly align with their educational journey, creating a global 
              community of empowered scholars.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-12 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Founded in 2024, the Scholarship Management System was born from a simple observation: talented students 
              worldwide were missing out on life-changing scholarship opportunities simply because they didn't know they existed. 
              Our founders, former scholarship recipients themselves, experienced firsthand the transformative power of 
              educational funding.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              What started as a small database of scholarships has grown into a comprehensive platform connecting 
              thousands of students with millions of dollars in educational funding. Today, we partner with universities, 
              organizations, and donors worldwide to ensure that every scholarship finds the right student, and every 
              student finds the right scholarship.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our platform has helped over 10,000 students secure funding for their education, with a combined scholarship 
              value exceeding $50 million. But we're just getting started – our vision is to make quality education 
              accessible to every deserving student, regardless of their financial background.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest standards of honesty and transparency in all our operations
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                We celebrate diversity and ensure equal opportunities for students from all backgrounds
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from platform features to student support
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">$50M+</div>
              <div className="text-blue-100">Scholarships Awarded</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Partner Universities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-100">Countries Reached</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect scholarship match. Your educational dreams are just a click away.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/scholarships"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Scholarships
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
    </div>

    
  );
}
