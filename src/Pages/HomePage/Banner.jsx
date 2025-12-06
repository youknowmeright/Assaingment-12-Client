import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Limited Time Offer: Apply Now!',
      subtitle: '$50,000 in New Scholarships Available',
      description: 'Don\'t miss out on exclusive scholarship opportunities for the 2026 academic year',
      buttonText: 'Apply Today',
      buttonLink: '/scholarships',
      bgGradient: 'from-blue-600 to-blue-800',
      badge: 'NEW',
    },
    {
      id: 2,
      title: 'Early Bird Special',
      subtitle: 'Submit by March 1st for Priority Review',
      description: 'Get your applications reviewed first and increase your chances of winning',
      buttonText: 'Start Application',
      buttonLink: '/register',
      bgGradient: 'from-purple-600 to-purple-800',
      badge: 'URGENT',
    },
    {
      id: 3,
      title: 'No Essay Required!',
      subtitle: 'Quick Apply Scholarships Now Open',
      description: 'Simple 5-minute applications for scholarships up to $10,000',
      buttonText: 'Browse Quick Apply',
      buttonLink: '/scholarships?filter=quick-apply',
      bgGradient: 'from-green-600 to-green-800',
      badge: 'EASY',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full bg-linear-to-r ${slide.bgGradient} text-white`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="text-center w-full">
                  {/* Badge */}
                  <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full mb-4">
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    {slide.buttonText} →
                  </Link>

                  {/* Statistics */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-4xl font-bold mb-2">500+</div>
                      <div className="text-white/90">Available Scholarships</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-4xl font-bold mb-2">10,000+</div>
                      <div className="text-white/90">Students Helped</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-4xl font-bold mb-2">$5M+</div>
                      <div className="text-white/90">Awards Distributed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
