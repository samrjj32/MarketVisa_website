'use client';
import { FaChartLine, FaUserGraduate, FaHandshake, FaAward } from 'react-icons/fa';

const achievements = [
  {
    icon: FaChartLine,
    title: "7+ Years Experience",
    description: "Extensive expertise in investing and trading in Indian markets"
  },
  // {
  //   icon: FaUserGraduate,
  //   title: "AMFI Registered",
  //   description: "Certified Mutual Fund Advisor with deep understanding of market dynamics"
  // },
  {
    icon: FaHandshake,
    title: "1000+ Satisfied Clients",
    description: "Helping investors achieve their financial goals through expert guidance"
  },
  {
    icon: FaAward,
    title: "₹10Cr+ Portfolio",
    description: "Successfully managing mutual fund investments worth over 10 Crores"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 justify-center">
  {achievements.map((achievement, index) => (
    <div key={index} className="bg-gray-50 rounded-lg p-5 lg:p-6 text-center">
      <achievement.icon className="w-10 h-10 lg:w-12 lg:h-12 text-green-600 mx-auto mb-3 lg:mb-4" />
      <h3 className="text-lg lg:text-xl font-bold mb-2">{achievement.title}</h3>
      <p className="text-sm lg:text-base text-gray-600">{achievement.description}</p>
    </div>
  ))}
</div>


     
      </div>
    </section>
  );
} 