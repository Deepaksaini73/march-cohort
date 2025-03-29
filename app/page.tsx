"use client";

import Navbar from './components/Navbar';
import OurFeatureTool from './components/ourfeature tool/OurfeaturTool';
import Hero from './components/hero/Hero';
import TourCategories from './components/tours/TourCategories';
import WhyTravelWithUs from './components/whyus/WhyTravelWithUs';
import TestimonialSlider from './components/testimonials/TestimonialSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TourCategories />
      <WhyTravelWithUs />
      <TestimonialSlider />
    </main>
  );
}
