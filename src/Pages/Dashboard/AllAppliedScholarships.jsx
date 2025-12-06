import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaEye, FaCommentDots, FaTimes } from 'react-icons/fa';

export default function AllAppliedScholarships() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    fetch('https://schoolarship-management-system-serv.vercel.app/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching applications:', err);
        toast.error('Failed to load applications');
        setLoading(false);
      });
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleFeedbackClick = (application) => {
    setSelectedApplication(application);
    setFeedback(application.application_feedback || '');
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    fetch(`https://schoolarship-management-system-serv.vercel.app/applications/${selectedApplication._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ 
        application_feedback: feedback,
        status: 'processing'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Feedback submitted successfully!',
            icon: 'success',
            confirmButtonColor: '#8B5CF6'
          });
          setShowFeedbackModal(false);
          setSelectedApplication(null);
          setFeedback('');
          fetchApplications();
        }
      })
      .catch(err => {
        console.error('Error submitting feedback:', err);
        toast.error('Failed to submit feedback');
      });
  };

  const handleCancelApplication = (applicationId, applicantName) => {
    Swal.fire({
      title: 'Cancel Application?',
      text: `Are you sure you want to cancel ${applicantName}'s application? The status will be set to "Rejected".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://schoolarship-management-system-serv.vercel.app/applications/${applicationId}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ status: 'rejected' })
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
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

  const handleStatusChange = (applicationId, newStatus) => {
    fetch(`https://schoolarship-management-system-serv.vercel.app/applications/${applicationId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`Status updated to ${newStatus}!`);
          fetchApplications();
        }
      })
      .catch(err => {
        console.error('Error updating status:', err);
        toast.error('Failed to update status');
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
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
            <svg className="w-7 h-7 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            All Applied Scholarships
          </h2>
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold text-purple-600">{applications.length}</span>
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Applications Yet</h3>
            <p className="text-gray-600">Applications will appear here once users start applying.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Applicant
                  </th>
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
                    Applied Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
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
                        <div className="font-semibold text-gray-900">{app.userName}</div>
                        <div className="text-sm text-gray-600">{app.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-900">{app.universityName}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {app.subjectCategory}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {app.applyingDegree}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-900 text-sm">
                      {new Date(app.applicationDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(app.status)} border-0 cursor-pointer`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(app)}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleFeedbackClick(app)}
                          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          title="Add Feedback"
                        >
                          <FaCommentDots />
                        </button>
                        <button
                          onClick={() => handleCancelApplication(app._id, app.user_name)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          title="Cancel Application"
                        >
                          <FaTimes />
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

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Application Details</h3>
              <p className="text-purple-100 mt-1">{selectedApplication.userName}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Applicant Name</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">University</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.universityName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Applied Degree</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.applyingDegree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subject Category</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.subjectCategory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Gender</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Study Gap</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.studyGap}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">SSC Result</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.sscResult}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">HSC Result</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.hscResult}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Application Fees</p>
                  <p className="font-semibold text-gray-900">${selectedApplication.applicationFee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(selectedApplication.status)}`}>
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="font-semibold text-gray-900">
                    {selectedApplication.address?.village}, {selectedApplication.address?.district}, {selectedApplication.address?.country}
                  </p>
                </div>
              </div>
              
              {/* Payment Information */}
              {selectedApplication.paymentInfo && (
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">💳 Payment Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Card Number</p>
                      <p className="font-semibold text-gray-900">{selectedApplication.paymentInfo.cardNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                      <p className="font-semibold text-gray-900">{selectedApplication.paymentInfo.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">CVC</p>
                      <p className="font-semibold text-gray-900">***</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">ZIP Code</p>
                      <p className="font-semibold text-gray-900">{selectedApplication.paymentInfo.zipCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                      <p className="font-semibold text-green-600 text-lg">${selectedApplication.paymentInfo.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {selectedApplication.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="bg-linear-to-r from-green-600 to-blue-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Provide Feedback</h3>
              <p className="text-green-100 mt-1">
                Feedback for {selectedApplication.user_name}'s application
              </p>
            </div>

            <form onSubmit={handleSubmitFeedback} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Feedback Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows="6"
                  placeholder="Provide feedback about missing documents, required information, or application status..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Feedback
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedApplication(null);
                    setFeedback('');
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
