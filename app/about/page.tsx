"use client";

import OurfeaturTool from '../OurfeaturTool';
import AMVR from '../components/amvr';
import TravelInspiration from '../components/inspiration';
import FAQ from '../components/FAQ';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <OurfeaturTool />
      <AMVR />
      <TravelInspiration />
      
      {/* FAQ section with colored background */}
      <div className="bg-gradient-to-tr from-blue-50 to-purple-50">
        <FAQ />
      </div>
    </main>
  );
} 