# EmailJS Setup Instructions

## Step 1: Get Your EmailJS Configuration Values

1. **Go to your EmailJS dashboard**: https://dashboard.emailjs.com/
2. **Get your Service ID**:
   - Go to "Email Services" 
   - Find your Gmail service
   - Copy the Service ID

3. **Get your Template ID**:
   - Go to "Email Templates"
   - Create a new template or use existing one
   - Copy the Template ID

4. **Get your Public Key**:
   - Go to "Account" → "General"
   - Copy the Public Key (User ID)

## Step 2: Create Environment Variables

Create a `.env.local` file in your project root and add:

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 3: Email Template Setup

In your EmailJS template, use these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Sender's phone
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_email}}` - Recipient email (ecomlifters@gmail.com)

## Sample Template:
```
Subject: New Contact Form Submission: {{subject}}

Hello,

You have received a new message from your website contact form.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your website contact form.
```

## Step 4: Test the Form

After setting up the environment variables, restart your development server and test the form.

## Security Note

Make sure to add `.env.local` to your `.gitignore` file to keep your EmailJS credentials secure. 