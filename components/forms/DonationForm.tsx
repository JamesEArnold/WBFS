"use client";

import React, { useState } from 'react';
import Button from '../ui/button';

// This is a placeholder for the DonationForm component that will be implemented in Phase 2.6
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
    // This will be fully implemented in Phase 2.6
    console.log('Donation submitted:', formData);
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Support Sheriff Weisburn</h2>
      
      {/* Progress indicator */}
      <div className="flex mb-8">
        <div className={`flex-1 h-2 ${step >= 1 ? 'bg-[#fcd34b]' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 h-2 ${step >= 2 ? 'bg-[#fcd34b]' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 h-2 ${step >= 3 ? 'bg-[#fcd34b]' : 'bg-gray-200'}`}></div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <>
            <h3 className="text-xl font-bold mb-4">Select Donation Amount</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {['25', '50', '100', '250', '500', '1000'].map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`py-3 px-4 border-2 rounded-md font-bold ${
                    formData.amount === amount 
                      ? 'bg-[#fcd34b] border-black text-black' 
                      : 'bg-white border-gray-300 text-gray-700 hover:border-[#fcd34b]'
                  }`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="customAmount">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="text"
                  id="customAmount"
                  name="customAmount"
                  value={formData.customAmount}
                  onChange={handleChange}
                  className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                  placeholder="Other amount"
                  onClick={() => setFormData(prev => ({ ...prev, amount: '' }))}
                />
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={handleNext} 
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              Continue
            </Button>
          </>
        )}
        
        {/* Step 2: Personal Information */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-bold mb-4">Your Information</h3>
            
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
              <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="state">
                  State *
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                  required
                >
                  <option value="">Select State</option>
                  <option value="OH">Ohio</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="MI">Michigan</option>
                  {/* Other states would be added here */}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
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
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="occupation">
                Occupation *
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="employer">
                Employer *
              </label>
              <input
                type="text"
                id="employer"
                name="employer"
                value={formData.employer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                required
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="button" 
                onClick={handleBack} 
                variant="outline" 
                size="lg" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="button" 
                onClick={handleNext} 
                variant="primary" 
                size="lg" 
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </>
        )}
        
        {/* Step 3: Payment Information */}
        {step === 3 && (
          <>
            <h3 className="text-xl font-bold mb-4">Payment Information</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="cardNumber">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="expiryDate">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="cvc">
                  CVC *
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd34b]"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Campaign finance law requires us to collect your occupation and employer. 
                Contributions are not tax deductible. By continuing, you confirm that this 
                contribution is made from your personal funds and not from a corporate or business account.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="button" 
                onClick={handleBack} 
                variant="outline" 
                size="lg" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="flex-1"
              >
                Donate ${formData.amount || formData.customAmount}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DonationForm; 
