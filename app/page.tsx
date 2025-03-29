"use client";

import { useState } from 'react';
import Image from 'next/image';
import Hero from './components/hero/Hero';
import TourCategories from './components/tours/TourCategories';
import WhyTravelWithUs from './components/whyus/WhyTravelWithUs';
import TestimonialSlider from './components/testimonials/TestimonialSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TourCategories />
      <WhyTravelWithUs />
      <TestimonialSlider />
    </main>
  );
}
