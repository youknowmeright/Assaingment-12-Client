import React from 'react';

export default function ReviewCard({ review }) {
  const { reviewer_image, reviewer_name, review_date, rating, comment } = review;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mx-2 my-4 h-full">
      {/* Reviewer Info */}
      <div className="flex items-center mb-4">
        <img
          src={reviewer_image}
          alt={reviewer_name}
          className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
        />
        <div className="ml-4">
          <h4 className="text-lg font-bold text-gray-800">{reviewer_name}</h4>
          <p className="text-sm text-gray-500">{formatDate(review_date)}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex">{renderStars(rating)}</div>
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {rating}.0 / 5.0
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 leading-relaxed italic">"{comment}"</p>

      {/* Decorative Quote Icon */}
      <div className="mt-4 flex justify-end">
        <svg
          className="w-8 h-8 text-blue-100"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>
    </div>
  );
}
