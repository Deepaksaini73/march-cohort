"use client";

<<<<<<< HEAD
import { useState } from 'react';
import Image from 'next/image';
import OurfeaturTool from './OurfeaturTool';
import Hero from './components/hero/Hero';
=======
import Navbar from './components/Navbar';
import OurFeatureTool from './components/ourfeature tool/OurfeaturTool';
import Hero from './components/hero/Hero';
import TourCategories from './components/tours/TourCategories';
import WhyTravelWithUs from './components/whyus/WhyTravelWithUs';
import TestimonialSlider from './components/testimonials/TestimonialSlider';
>>>>>>> 3562f1ec18a96aecc6a9f3b6a1b7d534a613515a

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
<<<<<<< HEAD
      {/* <OurfeaturTool /> */}
=======
      <Navbar />
      <Hero />
      <TourCategories />
      <WhyTravelWithUs />
      <TestimonialSlider />
>>>>>>> 3562f1ec18a96aecc6a9f3b6a1b7d534a613515a
    </main>
  );
}
