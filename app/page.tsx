"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import OurfeaturTool from './components/ourfeature tool/OurfeaturTool';

import Hero from './components/hero/Hero';


export default function Home() {
  const [activeTab, setActiveTab] = useState('Tours');
  
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* <Hero /> */}
    </main>
  );
}
