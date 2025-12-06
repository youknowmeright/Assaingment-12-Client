import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

export default function HomePage() {
  return (
    <div>
      <Banner />
      <TopScholarships />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
