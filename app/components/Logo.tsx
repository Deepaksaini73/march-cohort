"use client";

import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 relative mr-2">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5C15 5 12 8 12 13V20C12 25 15 28 20 28C25 28 28 25 28 20V13C28 8 25 5 20 5Z" fill="#FFD700"/>
          <path d="M12 20V27C12 32 15 35 20 35C25 35 28 32 28 27V20H12Z" fill="#00A651"/>
          <path d="M18 12C18 11.4477 18.4477 11 19 11H21C21.5523 11 22 11.4477 22 12V16C22 16.5523 21.5523 17 21 17H19C18.4477 17 18 16.5523 18 16V12Z" fill="#FFFFFF"/>
        </svg>
      </div>
      <span className="text-xl font-bold">Travila</span>
    </div>
  );
};

export default Logo; 