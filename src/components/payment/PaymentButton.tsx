'use client';
import { useState } from 'react';
import { loadRazorpay } from '@/client/utils/razorpay';
import type { RazorpayOptions, RazorpayResponse } from '@/types/razorpay';

interface PaymentButtonProps {
  amount: number;
  courseName: string;
  userId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentButton({
  amount,
  courseName,
  userId,
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const Razorpay = await loadRazorpay();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Mutual Fund Masterclass',
        description: courseName,
        order_id: '', // Will be set after order creation
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await fetch('/api/v1/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId
              })
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            onSuccess();
          } catch (error) {
            onError(error instanceof Error ? error.message : 'Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#16a34a' // green-600
        }
      };

      // Create order
      const orderResponse = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          courseName
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await orderResponse.json();
      options.order_id = orderId;

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : 'Pay Now'}
    </button>
  );
} 