'use client';
import Button from '../common/Button';
import Image from 'next/image';
import { FaCheckCircle, FaQuestionCircle, FaBookOpen, FaClock, FaArrowRight, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import { useState } from 'react';
import PaymentModal from '../common/PaymentModal';

interface WebinarFeature {
  title: string;
  description: string;
  icon: string;
}

const features: WebinarFeature[] = [
  {
    title: "Anyone determined to take control of their financial future",
    description: "",
    icon: "🎯"
  },
  {
    title: "Anyone planning for early retirement by achieving financial freedom",
    description: "",
    icon: "👨‍🏫"
  },
  {
    title: "You want to achieve financial goals—car, house, or vacation with mutual fund investing",
    description: "",
    icon: "📊"
  },
  {
    title: " You want to beat inflation and grow your wealth stress-free",
    description: "",
    icon: "🗣️"
  }
];

const learningOutcomes = [
  {
    title: 'Portfolio Management',
    points: [
      'How to manage your mutual fund portfolio',
      'Which mutual funds to invest in for safe returns',
      'How to tackle any market corrections or crashes during investing',
      "How to diversify mutual funds based on your risk profile and financial goals"
    ]
  },
  {
    title: 'Investment Strategies',
    points: [
      'How to achieve your financial goals through mutual fund investing',
      'How to leverage SIP, SWP, and STP in mutual funds',
      "How does compounding help to double your returns",
      'How to avoid common mistakes while investing in mutual funds'
    ]
  }
];

const commonDoubts = [
  'Lump sum or SIP?',
  'SWP or STP?',
  'Direct plan or regular?',
  'Active funds or passive funds?',
  'Expense ratio? NAV?',
  'Mutual fund diversification?'
];

const learningModules = [
  {
    title: "Portfolio Management",
    description: "Master the art of managing and optimizing your mutual fund portfolio",
    duration: "45 mins"
  },
  {
    title: "Fund Selection",
    description: "Learn to identify and select the best mutual funds for your goals",
    duration: "30 mins"
  },
  {
    title: "Risk Management",
    description: "Understand market corrections and develop risk management strategies",
    duration: "30 mins"
  },
  {
    title: "Advanced Strategies",
    description: "Deep dive into SIP, SWP, STP, and other advanced concepts",
    duration: "45 mins"
  }
];

export default function Courses() {
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

  return (
    <>
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Why Join This Webinar?</h2>
            {/* <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              Master Mutual Fund Investing
            </p>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Join us for an intensive masterclass where we cover everything you need to know about mutual fund investing
            </p> */}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What You Will Learn Section */}
          <div className="mb-12 sm:mb-20">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                What You Will Learn in This Mutual Fund Masterclass
              </h2>
              {/* <p className="text-gray-600 text-base sm:text-lg">
                Master the essentials of mutual fund investing through our comprehensive curriculum
              </p> */}
              <div className="w-16 sm:w-20 h-1 bg-[#00D066] mx-auto rounded-full mt-3 sm:mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {learningOutcomes.map((category, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 sm:px-8 py-4 sm:py-6 flex items-center gap-3 sm:gap-4">
                    {idx === 0 ? (
                      <FaGraduationCap className="text-white text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                    ) : (
                      <FaChartLine className="text-white text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                    )}
                    <div>
                      {/* <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">
                        {category.title}
                      </h3> */}
                      {/* <p className="text-green-100 mt-0.5 sm:mt-1 text-xs sm:text-sm">
                        {idx === 0 ? 'Master portfolio management techniques' : 'Learn advanced investment strategies'}
                      </p> */}
                    </div>
                  </div>
                  <div className="p-4 sm:p-8">
                    <ul className="space-y-4 sm:space-y-6">
                      {category.points.map((point, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-3 sm:gap-4 group/item hover:bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-colors"
                        >
                          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                            <FaCheckCircle className="text-green-600 text-base sm:text-lg group-hover/item:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                              {point}
                            </p>
                            {/* <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 group-hover/item:text-gray-600 transition-colors">
                              {index === 0 ? 'Core Concept' : index === 1 ? 'Essential Strategy' : 'Advanced Technique'}
                            </p> */}
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* <div className="mt-6 sm:mt-8 text-center">
                      <a 
                        href="#join"
                        className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 text-sm sm:text-base group/link"
                      >
                        Learn More 
                        <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Doubts Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Get Your Mutual Fund Related Doubts Sorted in 2-3 Hours
              </h2>
              {/* <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Get clear answers to the most common questions about mutual fund investing
              </p> */}
              <div className="w-16 sm:w-20 h-1 bg-[#00D066] mx-auto rounded-full mt-3 sm:mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {[
                { question: "Lump sum or SIP?", icon: "💰" },
                { question: "SWP or STP?", icon: "📊" },
                { question: "Direct plan or regular?", icon: "🎯" },
                { question: "Active funds or passive funds?", icon: "⚡" },
                { question: "Expense ratio? NAV?", icon: "📈" },
                { question: "Mutual fund diversification?", icon: "🔄" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div  className="flex justify-center mb-15">
          <Button 
                  variant="primary"
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="w-full md:w-auto px-12 py-4 text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 bg-[#00D066]"
                >
                  Book your slot and get one of our premium paid features for free.
                  <FaArrowRight className="w-4 h-4" />
                </Button>
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