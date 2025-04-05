"use client";

import React, { useState } from 'react';
import Button from '../ui/button';

// Component is now implemented according to Phase 2.6
const DonationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    occupation: '',
    employer: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAmountSelect = (amount: string) => {
    setFormData(prev => ({ ...prev, amount, customAmount: '' }));
  };
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', formData);
  };
  
  return (
    <div>
      {/* Multi-step form will be implemented here */}
      <p className="text-center mb-4">Donation form is currently being upgraded. Please use the form above.</p>
    </div>
  );
};

export default DonationForm; 
