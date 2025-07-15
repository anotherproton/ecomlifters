// EmailJS Configuration
// Replace these with your actual EmailJS values from your dashboard

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Template parameters structure for reference
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  phone: string;
  subject: string;
  message: string;
  to_email: string;
} 