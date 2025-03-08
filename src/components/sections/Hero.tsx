'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Shield } from 'lucide-react';
import Button from '../common/Button';
import PaymentButton from '../payment/PaymentButton';
import { FaClock, FaCalendar, FaLanguage, FaVideo, FaGift, FaRegClock, FaTag, FaArrowRight } from 'react-icons/fa';
import PaymentModal from '../common/PaymentModal';
import WhyChooseUs from './WhyChooseUs';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 59 });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [userDetails, setUserDetails] = useState<null | {
    name: string;
    email: string;
    phone: string;
    userId: string;
  }>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRegistration = async (formData: { name: string; email: string; phone: string }) => {
    try {
      setIsLoading(true);
      setError('');

      // Store user details
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

  return (
    <>
      <section className="relative py-8 lg:py-1 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 text-left space-y-6">
                {/* Main heading with mixed colors */}
                <div className="space-y-1">
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    <span className="text-[#00D066]">Unlock</span> Smart Investing
                  </h1>
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Secrets Through Top
                  </h1>
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    <span className="text-[#00D066]">Mutual Funds</span> – Live Webinar
                  </h1>
                </div>

                {/* Subheading */}
               
                <div className="space-y-1">
                  <h1 className="text-1xl lg:text-1xl font-bold">
                  Learn How To Maximize Your <span className="text-[#00D066]"> Mutual Fund Returns</span>,
                  Avoid Common Investment Mistakes &&nbsp;
                  <span className="text-[#00D066]">Build Long-Term Wealth</span>
                  </h1>
                
                  <h1 className="text-1xl lg:text-1xl font-bold">
                  
                  </h1>
                </div>

                {/* CTA Button */}
                {/* <div className="flex items-center gap-4">
                  <Button 
                    variant="primary"
                    className="px-8 py-3 text-base bg-[#00D066] hover:bg-[#00B056] rounded-md"
                    onClick={() => setShowModal(true)}
                  >
                    
                  </Button>
                </div> */}

                {/* Stats in a row */}
                {/* <div className="grid grid-cols-3 gap-6 mt-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#00D066]">1000+</h3>
                    <p className="text-gray-600 text-sm">Students Trained</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#00D066]">₹10Cr+</h3>
                    <p className="text-gray-600 text-sm">Portfolio Managed</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#00D066]">7+</h3>
                    <p className="text-gray-600 text-sm">Years Experience</p>
                  </div>
                </div> */}
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="relative w-full aspect-square max-w-[350px] sm:max-w-[450px] mx-auto">
                    <Image
                      src="/avatarImages/mentor.png"
                      alt="Nithin - Finance Educator"
                      fill
                      style={{ objectFit: 'contain' }}
                      className="z-10"
                      priority
                    />
                    <div className="absolute inset-0 bg-green-100 rounded-full z-0 transform -translate-x-3 translate-y-3 sm:-translate-x-4 sm:translate-y-4"></div>
                  </div>
                  
                  {/* Instructor Details Card */}
                  <div className="absolute bottom-0 right-0 sm:bottom-[-35px] sm:right-[20px] lg:right-[-40px] lg:bottom-[20px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-3 max-w-[210px] sm:max-w-[240px] z-20">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">One of Kerala's leading finance educator</p>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Nithin</h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#00D066] rounded-full"></div>
                        <p className="text-xs sm:text-sm text-gray-600">Co-founder of Marketvisa</p>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#00D066] rounded-full"></div>
                        <p className="text-xs sm:text-sm text-gray-600">AMFI-registered Mutual fund advisor</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#00D066] rounded-full"></div>
                        <p className="text-xs sm:text-sm text-gray-600">NISM-certified Research Analyst</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="join" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Section Heading */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Workshop Details</h2>
              <div className="w-20 h-1 bg-[#00D066] mx-auto rounded-full"></div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaCalendar className="w-6 h-6 text-[#00D066] mx-auto mb-2" />
                <p className="font-semibold">Date</p>
                <p className="text-gray-600">30th March</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaClock className="w-6 h-6 text-[#00D066] mx-auto mb-2" />
                <p className="font-semibold">Time</p>
                <p className="text-gray-600">11:00 AM</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaLanguage className="w-6 h-6 text-[#00D066] mx-auto mb-2" />
                <p className="font-semibold">Language</p>
                <p className="text-gray-600">Malayalam</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaVideo className="w-6 h-6 text-[#00D066] mx-auto mb-2" />
                <p className="font-semibold">Platform</p>
                <p className="text-gray-600">Live on Zoom</p>
              </div>
            </div>
                 <WhyChooseUs />


            {/* Price and CTA Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {/* <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Limited Time Special Offer
                </h3>
                <p className="text-gray-600">
                  Secure your spot now and start your investment journey
                </p>
              </div> */}

              {/* <div className="flex flex-col items-center space-y-6"> */}
                {/* Price Display */}
                {/* <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl w-full">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-3">
                      <FaTag className="w-6 h-6 text-[#00D066]" />
                      <span className="text-4xl font-bold text-[#00D066]">₹599</span>
                      <div className="flex flex-col items-start">
                        <span className="text-lg text-gray-400 line-through">₹2000</span>
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2">
                          <FaGift className="w-4 h-4" />
                          70% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Timer Display */}
                {/* <div className="w-full">
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <FaRegClock className="w-5 h-5" />
                    <p className="font-semibold text-lg">
                      Offer ends in {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, '0')} minutes
                    </p>
                  </div>
                </div> */}

                {/* CTA Button */}
                {/* <Button 
                  variant="primary"
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="w-full md:w-auto px-12 py-4 text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 bg-[#00D066]"
                >
                  Book Now
                  <FaArrowRight className="w-4 h-4" />
                </Button> */}
              {/* </div> */}
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