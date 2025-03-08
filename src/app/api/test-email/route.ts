import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Send test email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'samrajjkeezhoth@gmail.com',
      subject: 'Test Email - Mutual Fund Masterclass',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a; text-align: center;">Test Email</h1>
          
          <p>Hello!</p>
          
          <p>This is a test email to verify that the email configuration is working correctly.</p>
          
          <p>If you're receiving this email, it means:</p>
          <ul>
            <li>SMTP configuration is correct</li>
            <li>Email service is working</li>
            <li>Your app can send emails successfully</li>
          </ul>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">This is a test email from your application.</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully' 
    });
  } catch (error) {
    console.error('Failed to send test email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 