'use client';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Button from '../common/Button';
import PaymentModal from '../common/PaymentModal';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

function PricingCard({ name, price, description, features, isPopular }: PricingTier) {
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
    // Show success message
    alert('Payment successful! Check your email for course access details.');
    // Reset states
    setUserDetails(null);
    setShowModal(false);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setShowModal(true); // Show modal again with error
  };

  return (
    <>
      <div className={`
        p-8 rounded-2xl bg-white border-2 
        ${isPopular ? 'border-blue-600 relative shadow-lg' : 'border-gray-100'}
      `}>
        {isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">₹{price}</span>
          <span className="text-gray-600">/course</span>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-600">
              <FaCheck className="text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          variant={isPopular ? 'primary' : 'secondary'} 
          className="w-full"
          onClick={() => setShowModal(true)}
        >
          Get Started
        </Button>
      </div>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      /> 
    </>
  );
}

export default function Pricing() {
  const tiers: PricingTier[] = [
    {
      name: "Basic Access",
      price: "4,999",
      description: "Perfect for beginners starting their journey",
      features: [
        "Full course access",
        "Basic course materials",
        "Community access",
        "3 months access",
        "Email support"
      ]
    },
    {
      name: "Premium Access",
      price: "9,999",
      description: "Best value for serious learners",
      features: [
        "Everything in Basic",
        "Premium course materials",
        "Live Q&A sessions",
        "Lifetime access",
        "Priority support",
        "Certificate of completion"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "24,999",
      description: "Custom solutions for teams",
      features: [
        "Everything in Premium",
        "Custom learning path",
        "Team progress tracking",
        "Dedicated mentor",
        "Custom workshops",
        "Bulk pricing"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flexible pricing options to match your learning goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
} 