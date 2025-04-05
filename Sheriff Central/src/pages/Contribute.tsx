import { useState } from 'react';

export const Contribute = () => {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleAmountClick = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle the payment processing
    alert('Thank you for your contribution! This would connect to a payment processor in a real application.');
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#fcd34b]/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SUPPORT THE CAMPAIGN</h1>
          <p className="text-xl max-w-3xl mx-auto">Your contribution helps Sheriff Weisburn continue serving our community.</p>
        </div>
      </section>

      {/* Contribution Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center">MAKE A CONTRIBUTION</h2>
            
            <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8">
              <form onSubmit={handleSubmit}>
                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-xl font-bold mb-4">Select Contribution Amount</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {['25', '50', '100', '250', '500', '1000'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`py-3 px-4 rounded-md text-lg font-bold ${
                          amount === value 
                            ? 'bg-black text-[#fcd34b]' 
                            : 'bg-white border border-gray-300 hover:border-black'
                        }`}
                        onClick={() => handleAmountClick(value)}
                      >
                        ${value}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`py-3 px-4 rounded-md text-lg font-bold ${
                        amount === 'custom' 
                          ? 'bg-black text-[#fcd34b]' 
                          : 'bg-white border border-gray-300 hover:border-black'
                      }`}
                      onClick={() => handleAmountClick('custom')}
                    >
                      Custom
                    </button>
                  </div>
                  
                  {amount === 'custom' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Enter Custom Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          className="block w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          min="1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name*</label>
                        <input
                          type="text"
                          name="firstName"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name*</label>
                        <input
                          type="text"
                          name="lastName"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email*</label>
                        <input
                          type="email"
                          name="email"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Billing Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Address*</label>
                        <input
                          type="text"
                          name="address"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">City*</label>
                          <input
                            type="text"
                            name="city"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State*</label>
                          <input
                            type="text"
                            name="state"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">ZIP Code*</label>
                          <input
                            type="text"
                            name="zip"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            required
                            value={formData.zip}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Requirements */}
                <div className="mt-8 p-4 bg-gray-200 rounded-md text-sm">
                  <p className="mb-4">By contributing, I confirm that the following statements are true and accurate:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>I am a U.S. citizen or lawfully admitted permanent resident.</li>
                    <li>This contribution is made from my personal funds, not from corporate or business funds.</li>
                    <li>I am not a federal contractor.</li>
                    <li>I am making this contribution with my own funds and will not be reimbursed by another person.</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-black text-[#fcd34b] font-bold py-3 px-6 rounded-md text-xl hover:bg-gray-800 transition"
                  >
                    Complete Contribution
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              <p>Contributions to the Sheriff Weisburn Campaign are not tax deductible.</p>
              <p className="mt-2">Paid for by the Committee to Re-Elect Sheriff Weisburn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title inline-block">OTHER WAYS TO HELP</h2>
          <p className="max-w-3xl mx-auto mb-8 mt-4">
            Financial contributions are important, but there are many other ways you can support Sheriff Weisburn's campaign.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Volunteer</h3>
              <p className="mb-4">Join our team of dedicated volunteers who help with events, phone banking, and door-to-door outreach.</p>
              <button className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition">
                Sign Up
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Host an Event</h3>
              <p className="mb-4">Open your home or business for a campaign event or fundraiser to help spread Sheriff Weisburn's message.</p>
              <button className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition">
                Contact Us
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Spread the Word</h3>
              <p className="mb-4">Share Sheriff Weisburn's campaign with friends, family, and neighbors. Request yard signs or campaign materials.</p>
              <button className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition">
                Get Materials
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
