import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Email configuration
const getEmailConfig = () => ({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'josh.des.21@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Email templates
export const sendContactEmail = async (contactData) => {
  const { fullName, email, message, phone, subject } = contactData;
  
  try {
    // Create transporter for each email send
    const transporter = nodemailer.createTransport(getEmailConfig());
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'josh.des.21@gmail.com',
      to: process.env.EMAIL_USER || 'josh.des.21@gmail.com',
      subject: subject || `Portfolio Contact: Message from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>This email was sent from your portfolio contact form.</em></p>
        <p><em>Reply directly to this email to respond to: ${email}</em></p>
      `,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConnection = async () => {
  try {
    const transporter = nodemailer.createTransport(getEmailConfig());
    await transporter.verify();
    console.log('Email server is ready to send emails');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};
