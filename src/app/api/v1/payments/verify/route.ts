import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { PaymentService } from '@/server/services/payment.service';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId
    } = body;

    // Connect to database
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      );
    }

    // Verify payment signature
    const isValid = await PaymentService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user status
    user.status = 'completed';
    user.paymentId = razorpay_payment_id;
    await user.save();

    // Send success email (non-blocking)
    sendEmail({
      to: user.email,
      subject: 'Payment Successful - Mutual Fund Masterclass',
      html: `
        <h1>Payment Successful!</h1>
        <p>Dear ${user.name},</p>
        <p>Thank you for your payment. Your registration for the Mutual Fund Masterclass is now complete.</p>
        <p>You will receive the course access details shortly.</p>
        <p>Best regards,<br>Mutual Fund Masterclass Team</p>
      `
    }).catch(error => {
      console.error('Failed to send success email:', error);
      // Don't throw error, as email sending is not critical
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment verification failed' },
      { status: 500 }
    );
  }
} 