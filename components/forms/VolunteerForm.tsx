"use client";

import React, { useState } from 'react';
import Button from '../ui/button';

// This is a placeholder for the VolunteerForm component that will be implemented in Phase 4.2
const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    interests: [] as string[]
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, value] };
      } else {
        return { ...prev, interests: prev.interests.filter(interest => interest !== value) };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be fully implemented in Phase 4.2
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Volunteer Sign-up</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="zipCode">
          Zip Code *
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
          required
        />
      </div>
      
      <div className="mb-6">
        <p className="block text-gray-700 font-medium mb-2">
          I'd like to help with: (select all that apply)
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="phoneBank"
              name="interests"
              value="phoneBank"
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-[#fcd34b] border-gray-300 focus:ring-[#fcd34b]"
            />
            <label htmlFor="phoneBank" className="ml-2">
              Phone banking
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="canvassing"
              name="interests"
              value="canvassing"
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-[#fcd34b] border-gray-300 focus:ring-[#fcd34b]"
            />
            <label htmlFor="canvassing" className="ml-2">
              Canvassing
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="events"
              name="interests"
              value="events"
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-[#fcd34b] border-gray-300 focus:ring-[#fcd34b]"
            />
            <label htmlFor="events" className="ml-2">
              Events
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="other"
              name="interests"
              value="other"
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-[#fcd34b] border-gray-300 focus:ring-[#fcd34b]"
            />
            <label htmlFor="other" className="ml-2">
              Other
            </label>
          </div>
        </div>
      </div>
      
      <Button type="submit" variant="primary" size="lg" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default VolunteerForm; 
