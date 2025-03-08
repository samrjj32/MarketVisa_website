'use client';
import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear form data when modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  // Load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.name.length < 2 || formData.name.length > 50) {
      setError('Name must be between 2 and 50 characters');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }
    
    try {
      const res = await loadRazorpay();
      
      if (!res) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: 1 * 100,
        currency: "INR",
        name: "MK VISA FINANCIAL SOLUTIONS LLP",
        description: "Mutual Fund Masterclass Webinar By Nithin",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#16a34a"
        },
        handler: async function(response: any) {
          try {
            // Show payment success message first
            toast.success(
              <div className="flex flex-col gap-1">
                <span className="font-semibold">🎉 Payment Successful!</span>
                <span className="text-sm">You'll receive course details shortly.</span>
              </div>,
              { duration: 3000 }
            );

            // Close modal after showing success message
            onClose();

            // Send confirmation email
            const emailResponse = await fetch('/api/send-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                paymentId: response.razorpay_payment_id,
                amount: 1
              })
            });

            if (!emailResponse.ok) {
              console.error('Failed to send confirmation email');
              toast.error('Payment successful but email delivery failed. Please check your spam folder.', {
                duration: 5000
              });
            } else {
              toast.success('Check your email for confirmation!', {
                duration: 3000
              });
            }

            // Finally, register user (as last priority)
            try {
              const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...formData,
                  paymentId: response.razorpay_payment_id,
                  courseId: process.env.NEXT_PUBLIC_WEBINAR_COURSE_ID || 'webinar2025'
                })
              });

              if (!registerResponse.ok) {
                console.error('Registration failed:', await registerResponse.text());
                // Don't show error to user since they already got success message
              }
            } catch (registerError) {
              console.error('Registration error:', registerError);
              // Don't show error to user since they already got success message
            }
          } catch (error) {
            console.error('Payment success handler error:', error);
            toast.error('Something went wrong. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal closed");
          },
          escape: true,
          animation: true,
          backdropClose: false
        }
      };

      // @ts-ignore
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function(resp: any) {
        console.error('Payment failed:', resp.error);
        toast.error('Payment failed. Please try again.');
      });
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Header */}        
          <div className="text-center mb-6">
            <div className="bg-green-50 inline-flex rounded-full p-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Secure Checkout</h3>
            <p className="text-sm text-gray-500">Your information is protected by 256-bit SSL encryption</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
                minLength={2}
                maxLength={50}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                  pattern="[0-9]{10}"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mutual Fund Masterclass</span>
                <span className="text-gray-400 line-through">₹4,999</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-green-600">Special Offer Price</span>
                <span className="text-green-600">₹599</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Processing...' : 'Pay Securely'}</span>
              <Shield className="h-4 w-4" />
            </button>

            {/* Payment Methods */}
            <div className="flex justify-center space-x-4 pt-4 border-t">
              <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 