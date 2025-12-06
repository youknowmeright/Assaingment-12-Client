import React from 'react';
import { Link } from 'react-router-dom';
import useScholarships from '../../hooks/useScholarships';

export default function TopScholarships() {
  const { scholarships, loading, error } = useScholarships(6);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-lg text-gray-700">Loading scholarships...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>Error loading scholarships: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Scholarships
          </h2>
          <p className="text-lg text-gray-600">
            Explore our featured scholarship opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                  {scholarship.scholarship_category}
                </span>
                {scholarship.stipend && (
                  <span className="text-lg font-bold text-green-600">
                    💰 {scholarship.stipend.split(' ')[0]}
                  </span>
                )}
              </div>
              
              <div className="mb-3">
                {scholarship.university_logo && (
                  <img
                    src={scholarship.university_logo}
                    alt={scholarship.university_name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {scholarship.university_name}
                </h3>
                <p className="text-sm text-gray-600">
                  📍 {scholarship.location?.city}, {scholarship.location?.country}
                </p>
              </div>
              
              <div className="mb-3 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Subject:</span>{' '}
                  {scholarship.subject_name}
                </p>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {scholarship.scholarship_description}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Deadline: {formatDate(scholarship.application_deadline)}
              </div>
              
              <Link
                to={`/scholarship/${scholarship._id}`}
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/scholarships"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            View All Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
}
