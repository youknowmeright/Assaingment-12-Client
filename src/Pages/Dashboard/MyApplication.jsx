import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function MyApplication() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    reviewDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = () => {
    if (user?.email) {
      console.log('Fetching applications for:', user.email);
      fetch(`https://schoolarship-management-system-serv.vercel.app/applications/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
          console.log('Applications fetched:', data);
          setApplications(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching applications:', err);
          toast.error('Failed to load applications');
          setLoading(false);
        });
    }
  };

  const handleCancelApplication = (applicationId) => {
    Swal.fire({
      title: 'Cancel Application?',
      text: "Are you sure you want to cancel this application?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://schoolarship-management-system-serv.vercel.app/applications/${applicationId}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              toast.success('Application cancelled successfully!');
              fetchApplications();
            }
          })
          .catch(err => {
            console.error('Error cancelling application:', err);
            toast.error('Failed to cancel application');
          });
      }
    });
  };

  const handleEditApplication = (application) => {
    if (application.status !== 'pending') {
      Swal.fire({
        title: 'Cannot Edit',
        text: 'You cannot edit an application that is already processing or completed.',
        icon: 'error',
        confirmButtonColor: '#3B82F6'
      });
    } else {
      // Redirect to edit page or show edit modal
      // For now, we'll show a toast
      toast.info('Edit functionality will be implemented soon');
    }
  };

  const handleAddReview = (application) => {
    setSelectedScholarship(application);
    setReviewData({
      rating: 5,
      comment: '',
      reviewDate: new Date().toISOString().split('T')[0]
    });
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    const review = {
      scholarship_id: selectedScholarship.scholarshipId || selectedScholarship.scholarship_id,
      scholarship_name: selectedScholarship.scholarshipName || selectedScholarship.scholarship_name,
      university_name: selectedScholarship.universityName || selectedScholarship.university_name,
      university_id: selectedScholarship.university_id,
      user_name: user.displayName,
      user_email: user.email,
      user_image: user.photoURL || '',
      rating: parseInt(reviewData.rating),
      comment: reviewData.comment,
      review_date: reviewData.reviewDate
    };

    fetch('https://schoolarship-management-system-serv.vercel.app/reviews', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success('✅ Review submitted successfully!');
          setShowReviewModal(false);
          setSelectedScholarship(null);
        }
      })
      .catch(err => {
        console.error('Error submitting review:', err);
        toast.error('Failed to submit review');
      });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg
              className="w-7 h-7 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            My Applications
          </h2>
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold text-blue-600">{applications.length}</span>
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Applications Yet
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't applied to any scholarships yet.
            </p>
            <Link
              to="/scholarships"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Scholarships
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Service Charge
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {app.universityName || app.university_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {app.university_address}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-900">{app.subjectCategory || app.subject_category}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {app.applyingDegree || app.applied_degree}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-900">${app.applicationFee || app.application_fees}</td>
                    <td className="px-4 py-4 text-gray-900">${app.service_charge || 0}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600 max-w-xs">
                        {app.application_feedback || 'No feedback yet'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Link
                          to={`/scholarships/${app.scholarshipId || app.scholarship_id}`}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors text-center"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => handleEditApplication(app)}
                          className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancelApplication(app._id)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddReview(app)}
                          className="px-3 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded hover:bg-purple-700 transition-colors"
                        >
                          Add Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Add Review</h3>
              <p className="text-purple-100 mt-1">
                Share your experience with {selectedScholarship?.scholarship_name}
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Scholarship Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">University:</span> <span className="font-medium">{selectedScholarship?.university_name}</span></p>
                  <p><span className="text-gray-600">Scholarship:</span> <span className="font-medium">{selectedScholarship?.scholarship_name}</span></p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${i < reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 font-bold text-gray-700">{reviewData.rating}/5</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Review Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  required
                  rows="5"
                  placeholder="Share your experience with this scholarship..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Review Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={reviewData.reviewDate}
                  onChange={(e) => setReviewData({...reviewData, reviewDate: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedScholarship(null);
                  }}
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
