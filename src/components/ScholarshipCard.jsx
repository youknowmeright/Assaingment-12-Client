import React from 'react';
import { Link } from 'react-router-dom';

export default function ScholarshipCard({ scholarship }) {
  const {
    _id,
    university_name,
    university_logo,
    scholarship_category,
    location,
    application_deadline,
    subject_name,
    scholarship_description,
    stipend,
    post_date,
    service_charge,
    application_fees,
  } = scholarship;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
      {/* University Logo/Banner */}
      <div className="relative h-48 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
        {university_logo ? (
          <img
            src={university_logo}
            alt={university_name}
            className="w-full h-full object-contain p-4 bg-white"
          />
        ) : (
          <div className="text-white text-6xl font-bold opacity-20">
            {university_name?.charAt(0)}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-xs font-semibold text-blue-600">
            {scholarship_category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 grow flex flex-col">
        {/* University Info */}
        <div className="mb-3">
          <p className="text-lg font-bold text-blue-600 mb-1">{university_name}</p>
          <p className="text-sm text-gray-600">
            📍 {location?.city}, {location?.country}
          </p>
        </div>

        {/* Scholarship Category */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {scholarship_category}
        </h3>

        {/* Details Grid */}
        <div className="space-y-2 mb-4 grow">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Subject:</span>
            <span className="text-sm font-semibold text-gray-800 text-right">
              {subject_name}
            </span>
          </div>

          {stipend && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Stipend:</span>
              <span className="text-sm font-semibold text-green-600 text-right">
                {stipend}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Application Fee:</span>
            <span className="text-sm font-semibold text-gray-800">
              ${application_fees}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Service Charge:</span>
            <span className="text-sm font-semibold text-gray-800">
              ${service_charge}
            </span>
          </div>
        </div>

        {/* Description */}
        {scholarship_description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {scholarship_description}
          </p>
        )}

        {/* Deadline */}
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
          <p className="text-xs text-gray-600">Application Deadline</p>
          <p className="text-sm font-bold text-red-600">
            {formatDate(application_deadline)}
          </p>
        </div>

        {/* Action Button */}
        <Link
          to={`/scholarship/${_id}`}
          className="block w-full text-center bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
