import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewCard from '../../components/ReviewCard';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    phone: '',
    gender: '',
    address: '',
    studyGap: '',
    sscResult: '',
    hscResult: ''
  });

  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://schoolarship-management-system-serv.vercel.app/scholarships/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch scholarship details');
        }

        const data = await response.json();
        setScholarship(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setScholarship(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://schoolarship-management-system-serv.vercel.app/reviews`);
        if (response.ok) {
          const allReviews = await response.json();
          // Filter reviews for this scholarship
          const scholarshipReviews = allReviews.filter(
            review => review.scholarship_id === id
          );
          setReviews(scholarshipReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchScholarshipDetails();
    fetchReviews();
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Carousel navigation
  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % (reviews.length || 1));
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) =>
      prev === 0 ? (reviews.length - 1 || 0) : prev - 1
    );
  };

  const handleApply = () => {
    // Navigate to the apply scholarship page
    navigate(`/apply-scholarship/${id}`);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    const application = {
      scholarship_id: scholarship._id,
      scholarship_name: scholarship.scholarship_name || scholarship.university_name,
      university_name: scholarship.university_name,
      university_id: scholarship._id,
      university_address: `${scholarship.location.city}, ${scholarship.location.country}`,
      subject_category: scholarship.subject_name,
      applied_degree: scholarship.scholarship_category,
      application_fees: scholarship.application_fees,
      service_charge: 10, // Fixed service charge
      status: 'pending',
      application_feedback: '',
      user_email: user.email,
      user_name: user.displayName,
      ...applicationData,
      applied_date: new Date().toISOString()
    };

    try {
      const response = await fetch('https://schoolarship-management-system-serv.vercel.app/applications', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      
      const data = await response.json();
      
      if (data.insertedId) {
        setShowApplicationModal(false);
        Swal.fire({
          title: 'Success!',
          text: 'Your application has been submitted successfully!',
          icon: 'success',
          confirmButtonColor: '#3B82F6'
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-xl text-gray-700 font-semibold">
            Loading Scholarship Details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/scholarships')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Scholarships
          </button>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-700">Scholarship not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/scholarships')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Scholarships
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section with University Logo */}
          <div className="relative bg-linear-to-r from-blue-600 to-purple-600 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* University Logo */}
              {scholarship.university_logo && (
                <div className="w-32 h-32 bg-white rounded-xl p-4 shadow-lg">
                  <img
                    src={scholarship.university_logo}
                    alt={scholarship.university_name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Title and Basic Info */}
              <div className="flex-1 text-white text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {scholarship.university_name}
                </h1>
                <p className="text-xl font-semibold text-blue-100 mb-2">
                  {scholarship.scholarship_category}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-blue-50">
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {scholarship.location?.city}, {scholarship.location?.country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Scholarship Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {scholarship.scholarship_description}
                  </p>
                </div>

                {/* Subject Information */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Subject Area
                  </h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    📚 {scholarship.subject_name}
                  </p>
                </div>

                {/* Financial Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Financial Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scholarship.stipend && (
                      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Stipend</p>
                        <p className="text-xl font-bold text-green-700">
                          {scholarship.stipend}
                        </p>
                      </div>
                    )}
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Application Fees
                      </p>
                      <p className="text-xl font-bold text-blue-700">
                        ${scholarship.application_fees}
                      </p>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Service Charge</p>
                      <p className="text-xl font-bold text-purple-700">
                        ${scholarship.service_charge}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Key Info Cards */}
              <div className="space-y-6">
                {/* Application Deadline */}
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-6 h-6 text-red-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800">
                      Application Deadline
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    {formatDate(scholarship.application_deadline)}
                  </p>
                </div>

                {/* Post Date */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-6 h-6 text-gray-600 mr-2"
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
                    <h3 className="text-lg font-bold text-gray-800">
                      Posted On
                    </h3>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">
                    {formatDate(scholarship.post_date)}
                  </p>
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleApply}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Apply for Scholarship
                </button>

                {/* Quick Stats */}
                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Category</span>
                      <span className="font-semibold text-gray-800 text-right">
                        {scholarship.scholarship_category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-semibold text-gray-800 text-right">
                        {scholarship.location?.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <svg
                  className="w-8 h-8 mr-3 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Student Reviews
              </h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : 'N/A'} {reviews.length > 0 && '/ 5.0'}
                </p>
                <p className="text-xs text-gray-500">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-gray-600">No reviews yet for this scholarship.</p>
                  <p className="text-sm text-gray-500 mt-2">Be the first to share your experience!</p>
                </div>
              ) : (
                <>
                  {/* Review Cards Container */}
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentReviewIndex * 100}%)`,
                      }}
                    >
                      {reviews.map((review) => (
                        <div
                          key={review._id}
                          className="w-full shrink-0 px-2"
                        >
                          <ReviewCard review={review} />
                        </div>
                      ))}
                    </div>
                  </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all"
                aria-label="Previous review"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all"
                aria-label="Next review"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Dots Indicator */}
              {reviews.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentReviewIndex
                          ? 'bg-blue-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Apply for Scholarship</h3>
              <p className="text-blue-100 mt-1">
                {scholarship?.scholarship_name || scholarship?.university_name}
              </p>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Applicant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={applicationData.gender}
                    onChange={(e) => setApplicationData({...applicationData, gender: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={applicationData.address}
                    onChange={(e) => setApplicationData({...applicationData, address: e.target.value})}
                    required
                    placeholder="Enter your full address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Study Gap (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={applicationData.studyGap}
                    onChange={(e) => setApplicationData({...applicationData, studyGap: e.target.value})}
                    required
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    SSC Result (GPA/CGPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={applicationData.sscResult}
                    onChange={(e) => setApplicationData({...applicationData, sscResult: e.target.value})}
                    required
                    placeholder="e.g., 5.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    HSC Result (GPA/CGPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={applicationData.hscResult}
                    onChange={(e) => setApplicationData({...applicationData, hscResult: e.target.value})}
                    required
                    placeholder="e.g., 5.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Application Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Application Fees:</p>
                    <p className="font-semibold">${scholarship?.application_fees}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Service Charge:</p>
                    <p className="font-semibold">$10</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Amount:</p>
                    <p className="font-bold text-blue-600 text-lg">${(scholarship?.application_fees || 0) + 10}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
