import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, paymentId, amount } = await request.json();

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Payment Confirmation - Mutual Fund Masterclass',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a; text-align: center;">Payment Confirmation</h1>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your payment of ₹${amount} for the Mutual Fund Masterclass. Your registration has been confirmed!</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Payment Details</h2>
            <p><strong>Amount:</strong> ₹${amount}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Course:</strong> Mutual Fund Masterclass</p>
          </div>
          
          <p>You will receive further instructions about accessing the course content shortly.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
} 