'use client';

import React from 'react';
import VolunteerForm from '@/components/forms/VolunteerForm';

export default function VolunteerPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="section-title text-center mb-8">JOIN OUR TEAM</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#fcd34b]">
            <p className="text-center text-lg mb-8">
              I need boots on the ground. Stand by my side as I fight for a better Stark County.
              Let our voices be heard. Are <span className="font-bold">YOU</span> with me?
            </p>
            
            <VolunteerForm />
          </div>
        </div>
      </div>
    </div>
  );
} 
