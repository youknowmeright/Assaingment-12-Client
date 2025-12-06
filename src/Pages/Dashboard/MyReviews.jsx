import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function MyReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rating: 5,
    comment: '',
    review_date: ''
  });

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const fetchReviews = () => {
    if (user?.email) {
      fetch(`https://schoolarship-management-system-serv.vercel.app/reviews/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setReviews(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching reviews:', err);
          toast.error('Failed to load reviews');
          setLoading(false);
        });
    }
  };

  const handleDeleteReview = (reviewId) => {
    Swal.fire({
      title: 'Delete Review?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://schoolarship-management-system-serv.vercel.app/reviews/${reviewId}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              toast.success('🗑️ Review deleted successfully!');
              fetchReviews();
            }
          })
          .catch(err => {
            console.error('Error deleting review:', err);
            toast.error('Failed to delete review');
          });
      }
    });
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditFormData({
      rating: review.rating,
      comment: review.comment,
      review_date: review.review_date
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`https://schoolarship-management-system-serv.vercel.app/reviews/${editingReview._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Your review has been updated successfully!',
            icon: 'success',
            confirmButtonColor: '#3B82F6'
          });
          setShowEditModal(false);
          setEditingReview(null);
          fetchReviews();
        }
      })
      .catch(err => {
        console.error('Error updating review:', err);
        toast.error('Failed to update review');
      });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
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
              className="w-7 h-7 mr-2 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            My Reviews
          </h2>
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold text-purple-600">{reviews.length}</span>
          </span>
        </div>

        {reviews.length === 0 ? (
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600">
              You haven't written any reviews yet. Apply to scholarships and share your experience!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Scholarship Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Review Comment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Review Date
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-900">
                        {review.scholarship_name}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-900">
                      {review.university_name}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm font-semibold text-gray-700">
                          {review.rating}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-700 max-w-md">
                        {review.comment.length > 100 
                          ? review.comment.substring(0, 100) + '...' 
                          : review.comment}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-900">
                      {formatDate(review.review_date)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(review)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
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

      {/* Edit Review Modal */}
      {showEditModal && editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Edit Review</h3>
              <p className="text-blue-100 mt-1">
                Update your review for {editingReview.scholarship_name}
              </p>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Scholarship Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">University:</span> <span className="font-medium">{editingReview.university_name}</span></p>
                  <p><span className="text-gray-600">Scholarship:</span> <span className="font-medium">{editingReview.scholarship_name}</span></p>
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
                    value={editFormData.rating}
                    onChange={(e) => setEditFormData({...editFormData, rating: e.target.value})}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${i < editFormData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 font-bold text-gray-700">{editFormData.rating}/5</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Review Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editFormData.comment}
                  onChange={(e) => setEditFormData({...editFormData, comment: e.target.value})}
                  required
                  rows="5"
                  placeholder="Share your experience with this scholarship..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Review Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={editFormData.review_date}
                  onChange={(e) => setEditFormData({...editFormData, review_date: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Update Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingReview(null);
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
