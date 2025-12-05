/**
 * Contact Form API Route for Vercel Serverless Deployment
 * 
 * This endpoint handles contact form submissions and sends emails via SMTP.
 * 
 * USAGE:
 * Send a POST request to /api/contact with JSON body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "message": "Your message here"
 * }
 * 
 * REQUIRED ENVIRONMENT VARIABLES:
 * 
 * Set these in Vercel dashboard (Settings > Environment Variables) or in .env.local for local development:
 * 
 * - SMTP_HOST: SMTP server hostname (e.g., smtp.gmail.com, smtp.sendgrid.net)
 * - SMTP_PORT: SMTP server port (usually 587 for TLS, 465 for SSL)
 * - SMTP_USER: SMTP username/email address for authentication
 * - SMTP_PASS: SMTP password or API key for authentication
 * - SMTP_FROM: Email address to send from (e.g., noreply@yourdomain.com)
 * 
 * SECURITY NOTES:
 * - Never commit credentials to version control
 * - Use environment variables for all sensitive data
 * - For Gmail: use App Passwords, not your regular password
 * - For production: use a dedicated email service (SendGrid, AWS SES, etc.)
 * 
 * RESPONSES:
 * - 200: Success - Email sent successfully
 * - 400: Bad Request - Missing or invalid fields
 * - 405: Method Not Allowed - Only POST requests are accepted
 * - 500: Internal Server Error - Email sending failed
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  error?: string;
};

/**
 * Validates email format using a simple regex pattern
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates the contact form data
 */
function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.push('Email is required and must be a non-empty string');
  } else if (!isValidEmail(data.email.trim())) {
    errors.push('Email must be a valid email address');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required and must be a non-empty string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Main API route handler
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // Validate form data
    const validation = validateFormData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: validation.errors.join('; ')
      });
    }

    const { name, email, message }: ContactFormData = req.body;

    // Check if required environment variables are set
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars.join(', '));
      return res.status(500).json({
        success: false,
        message: 'Server configuration error',
        error: 'Email service not properly configured'
      });
    }

    // Create nodemailer transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: 'contact@thecompliers.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
You have received a new message from the contact form:

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from The Compliers contact form.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0077cc;">New Contact Form Submission</h2>
          <p>You have received a new message from the contact form:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">This email was sent from The Compliers contact form.</p>
        </div>
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    // Error handling
    console.error('Error sending email:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
