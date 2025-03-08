'use client';
import React from 'react';
import Button from '../common/Button';
import { useState } from 'react';
import PaymentButton from '../payment/PaymentButton';
import PaymentModal from '../common/PaymentModal';

export default function Benefits() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [userDetails, setUserDetails] = useState<null | {
    name: string;
    email: string;
    phone: string;
    userId: string;
  }>(null);

  const handleRegistration = async (formData: { name: string; email: string; phone: string }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      setUserDetails({ ...formData, userId: data.userId });
      setShowModal(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Check your email for course access details.');
    setUserDetails(null);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setShowModal(true);
  };

  const benefits = [
    'Anyone determined to take control of their financial future',
    'Anyone planning for early retirement by achieving financial freedom',
    'You want to achieve financial goals—car, house, or vacation with mutual fund investing',
    'You want to beat inflation and grow your wealth stress-free'
  ];

  const learningOutcomes = [
    'How to manage your mutual fund portfolio',
    'Which mutual funds to invest in for safe returns',
    'How to tackle any market corrections or crashes during investing',
    'How to diversify mutual funds based on your risk profile and financial goals',
    'How to achieve your financial goals through mutual fund investing',
    'How to leverage SIP, BWP, and STP in mutual funds',
    'How to avoid common mistakes while investing in mutual funds'
  ];

  const commonDoubts = [
    'Lump sum or SIP?',
    'SWP or STP?',
    'Direct plan or regular?',
    'Active funds or passive funds?',
    'Expense ratio? NAV?',
    'Mutual fund diversification?'
  ];

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Experience Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">7+</p>
              <p className="text-gray-600">Years of expertise in investing and trading</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">10Cr+</p>
              <p className="text-gray-600">Managing mutual fund investments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">1000+</p>
              <p className="text-gray-600">Satisfied clients</p>
            </div>
          </div>

          {/* Why Join Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Join This Webinar?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
                  <span className="text-green-600 text-xl">✅</span>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button 
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="px-8 py-4"
              >
                BOOK YOUR SLOT
              </Button>
            </div>
          </div>

          {/* What You Will Learn Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              What You Will Learn in This Mutual Fund Masterclass
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
                  <span className="text-green-600 text-xl">✅</span>
                  <p className="text-gray-700">{outcome}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button 
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="px-8 py-4"
              >
                BOOK YOUR SLOT
              </Button>
            </div>
          </div>

          {/* Common Doubts Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">
              Mutual Funds Doubts Sorted in 2 to 3 Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {commonDoubts.map((doubt, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
                  <span className="text-purple-600 text-xl">❓</span>
                  <p className="text-gray-700">{doubt}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button 
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="px-8 py-4"
              >
                BOOK YOUR SLOT AND GET ONE OF OUR PREMIUM PAID FEATURES FOR FREE
              </Button>
            </div>
          </div>
        </div>
      </section>


<PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      /> 
    </>
  );
} 