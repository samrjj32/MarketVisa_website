'use client';
import Image from 'next/image';
import { FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';

const achievements = [
  "Co-founder of Marketvisa",
  "AMFI-registered Mutual Fund Advisor",
  "NISM-certified Research Analyst",
  "7+ years of market experience",
  "Managing ₹10Cr+ mutual fund portfolio",
  "Trained 1000+ investors",
  "Featured in leading Malayalam business channels",
  "Conducted 100+ financial literacy workshops"
];

const expertise = [
  {
    title: "Mutual Fund Analysis",
    description: "Deep expertise in analyzing and selecting the best performing mutual funds based on risk-adjusted returns."
  },
  {
    title: "Portfolio Management",
    description: "Proven track record in building and managing diversified investment portfolios for optimal returns."
  },
  {
    title: "Financial Planning",
    description: "Helping investors create personalized financial roadmaps to achieve their life goals."
  },
  {
    title: "Risk Management",
    description: "Expert in developing strategies to protect investments during market volatility."
  }
];

export default function Mentor() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="relative w-full aspect-square max-w-[350px] sm:max-w-[450px] mx-auto">
                  <Image
                    src="/avatarImages/authorImg.png"
                    alt="Nithin - Finance Educator"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="z-10"
                    priority
                  />
                  <div className="absolute inset-0 bg-green-100 rounded-full z-0 transform -translate-x-3 translate-y-3 sm:-translate-x-4 sm:translate-y-4"></div>
                </div>
                {/* <div className="absolute top-4 right-4 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm">
                  <p className="text-xs sm:text-sm font-medium">Best Finance Educator</p>
                </div> */}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Meet Your Mentor
              </h2>
              <div className="w-20 h-1 bg-green-400 mb-6 mx-auto lg:mx-0"></div>
              
              <p className="text-base sm:text-lg text-gray-600 mb-8">
                Learn from Kerala's Leading Finance Educator with extensive experience in mutual fund investing and portfolio management.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <span className="text-green-500 text-lg sm:text-xl mt-1">✦</span>
                    <p className="text-sm sm:text-base text-gray-700 leading-tight">{achievement}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {expertise.slice(0, 2).map((item, index) => (
                  <div key={index} className="border-l-4 border-green-400 pl-4 text-left">
                    <h4 className="text-base sm:text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-gray-500">Co-Founder</p>
                  <p className="text-xs sm:text-sm font-medium">Marketvisa</p>
                </div>
                <div className="flex gap-4 sm:ml-auto">
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 