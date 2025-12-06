import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch('https://schoolarship-management-system-serv.vercel.app/reviews')
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
  };

  const handleDeleteReview = (reviewId, reviewerName) => {
    Swal.fire({
      title: 'Delete Review?',
      text: `Are you sure you want to delete ${reviewerName}'s review? This action cannot be undone!`,
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
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
            <svg className="w-7 h-7 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            All Reviews
          </h2>
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold text-purple-600">{reviews.length}</span>
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600">Reviews will appear here once users start submitting them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Card Header */}
                <div className="bg-linear-to-r from-purple-600 to-blue-600 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">
                    {review.university_name}
                  </h3>
                  <p className="text-purple-100 text-sm">
                    {review.scholarship_name}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Reviewer Info */}
                  <div className="flex items-center mb-4">
                    <img
                      src={review.user_image || 'https://via.placeholder.com/50'}
                      alt={review.user_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-gray-900">{review.user_name}</p>
                      <p className="text-sm text-gray-600">{formatDate(review.review_date)}</p>
                    </div>
                  </div>

                  {/* Subject Category Badge */}
                  <div className="mb-3">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {review.scholarship_name}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
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
                    </div>
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Review Comment */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {review.comment}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteReview(review._id, review.user_name)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <FaTrash />
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
