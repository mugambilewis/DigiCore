const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create email transporter
// Configure with your email service (Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send OTP email for password reset
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 * @returns {Promise<void>}
 */
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@digicore.com',
      to: email,
      subject: 'DigiCore - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password for your DigiCore account.</p>
          <p>Your OTP code is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">DigiCore - Digital Electronics Store</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

/**
 * Send receipt email
 * @param {string} email - Recipient email
 * @param {string} receiptLink - Link to download receipt
 * @param {string} orderId - Order ID
 * @returns {Promise<void>}
 */
const sendReceiptEmail = async (email, receiptLink, orderId) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@digicore.com',
      to: email,
      subject: `DigiCore - Order Confirmation #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Confirmation</h2>
          <p>Thank you for your purchase!</p>
          <p>Your order <strong>#${orderId}</strong> has been confirmed.</p>
          <p>You can download your receipt using the link below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}${receiptLink}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Download Receipt
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">DigiCore - Digital Electronics Store</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Receipt email sent to ${email}`);
  } catch (error) {
    console.error('Error sending receipt email:', error);
    throw new Error('Failed to send receipt email');
  }
};

module.exports = { sendOTPEmail, sendReceiptEmail };

