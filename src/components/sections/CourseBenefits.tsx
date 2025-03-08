import { IconType } from 'react-icons';
import { FaLaptopCode, FaCertificate, FaUsers, FaHeadset } from 'react-icons/fa';

interface BenefitCardProps {
  title: string;
  description: string;
  Icon: IconType;
}

function BenefitCard({ title, description, Icon }: BenefitCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function CourseBenefits() {
  const benefits = [
    {
      title: "Expert-Led Training",
      description: "Learn from industry professionals with years of practical experience",
      Icon: FaLaptopCode
    },
    {
      title: "Certification",
      description: "Earn a verified certificate upon successful course completion",
      Icon: FaCertificate
    },
    {
      title: "Community Support",
      description: "Join a community of learners and expand your network",
      Icon: FaUsers
    },
    {
      title: "Dedicated Support",
      description: "Get help when you need it with our responsive support team",
      Icon: FaHeadset
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Courses?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive learning experiences designed to help you succeed in your career
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
} 