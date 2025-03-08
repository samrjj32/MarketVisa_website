import Razorpay from 'razorpay';
import { getEnvVariable } from '../config/env';

const razorpay = new Razorpay({
  key_id: getEnvVariable('RAZORPAY_KEY_ID'),
  key_secret: getEnvVariable('RAZORPAY_KEY_SECRET'),
});

export class PaymentService {
  static async createOrder(amount: number, currency: string = 'INR') {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
      throw new Error('Payment initialization failed');
    }
  }

  static async verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', getEnvVariable('RAZORPAY_KEY_SECRET'))
      .update(body.toString())
      .digest('hex');

    return expectedSignature === razorpay_signature;
  }
} 