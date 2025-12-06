import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      university: 'Stanford University',
      image: '👩‍🎓',
      quote: 'Thanks to this platform, I found the perfect STEM scholarship that covered my entire tuition. The application process was seamless and straightforward.',
      amount: '$10,000',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Engineering Major',
      university: 'MIT',
      image: '👨‍🎓',
      quote: 'I was amazed by how many opportunities were available. The filtering system helped me find scholarships that perfectly matched my profile.',
      amount: '$8,500',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Business Administration',
      university: 'Harvard University',
      image: '👩‍💼',
      quote: 'As a first-generation college student, this platform made it easy to find and apply for scholarships. I received three awards in one semester!',
      amount: '$12,000',
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            Hear from students who achieved their dreams through scholarships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600 font-semibold">
                    {testimonial.university}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Scholarship Award</span>
                  <span className="text-xl font-bold text-green-600">
                    {testimonial.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="ml-2 font-semibold">4.9/5 from 2,500+ students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
