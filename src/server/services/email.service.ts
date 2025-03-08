import nodemailer from 'nodemailer';
import { getEnvVariable } from '../config/env';

const transporter = nodemailer.createTransport({
  host: getEnvVariable('SMTP_HOST'),
  port: parseInt(getEnvVariable('SMTP_PORT')),
  secure: true,
  auth: {
    user: getEnvVariable('SMTP_USER'),
    pass: getEnvVariable('SMTP_PASSWORD'),
  },
});

export class EmailService {
  static async sendPaymentConfirmation(
    email: string,
    name: string,
    courseName: string,
    amount: number
  ) {
    const mailOptions = {
      from: getEnvVariable('SMTP_FROM'),
      to: email,
      subject: 'Payment Confirmation - MK VISA FINANCIAL SOLUTIONS LLP',
      hqtml: `
      /
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your purchase!</h2>
          <p>Dear ${name},</p>
          <p>Your payment of ₹${amount} for ${courseName} has been successfully processed.</p>
          <div style="margin: 20px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
            <h3 style="margin-top: 0;">Order Details:</h3>
            <p>Course: ${courseName}</p>
            <p>Amount: ₹${amount}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <p>You can now access your course by logging into your account.</p>
          <div style="margin-top: 30px;">
            <a href="${getEnvVariable('NEXT_PUBLIC_APP_URL')}/dashboard" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px;">
              Go to Dashboard
            </a>
          </div>
          <p style="margin-top: 30px;">
            If you have any questions, please don't hesitate to contact our support team.
          </p>
          <p>Best regards,<br>MK VISA FINANCIAL SOLUTIONS LLP</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send confirmation email');
    }
  }
} 