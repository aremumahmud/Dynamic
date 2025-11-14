# Email Integration Setup Guide

## Overview
This project includes form email integration using Brevo (formerly Sendinblue) API for the following forms:
- Contact Form (`/contact`)
- Consultation/Scheduling Form (`/scheduling`)
- Referral Form (`/refer-us`)

## Email Templates Preview
The following HTML email templates have been created and can be previewed in your browser:
- `email-templates/contact-form-template.html`
- `email-templates/consultation-form-template.html` 
- `email-templates/referral-form-template.html`

## Setup Instructions

### 1. Get Brevo API Key
1. Sign up for a free Brevo account at https://app.brevo.com
2. Navigate to Settings > API Keys
3. Create a new API key with "Send emails" permission
4. Copy the API key

### 2. Configure Environment Variables
1. Create a `.env` file in the project root
2. Add your Brevo API key:
```
REACT_APP_BREVO_API_KEY=your_api_key_here
```

### 3. Email Recipients Configuration
The email service is configured to send emails to:
- **Contact Form**: `Info@journey-of-care.com`
- **Consultation Form**: `Info@journey-of-care.com`
- **Referral Form**: `referrals@journey-of-care.com`

You can modify these in `src/services/emailService.js`.

### 4. Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to any form page
3. Fill out and submit a form
4. Check the console for success/error messages
5. Check your Brevo dashboard for email activity

## Email Template Features

### Contact Form Email
- **Subject**: "New Contact Form Submission - [URGENCY]"
- **Priority Badge**: Visual urgency indicator
- **Contact Info**: Name, email, phone with clickable links
- **Service Interest**: Selected service type
- **Message**: Full user message with line breaks preserved

### Consultation Form Email
- **Subject**: "New Consultation Request - [URGENCY]"
- **Sections**: 
  - Contact Information
  - Care Recipient Details
  - Service Requirements
  - Location & Additional Info
- **Services List**: Visual list of selected services
- **Timeline**: Start date and preferred time

### Referral Form Email
- **Subject**: "New Referral Submission - [URGENCY]"
- **Referral Summary**: Highlighted summary box
- **Sections**:
  - Referrer Information
  - Client Information
  - Care Requirements
- **Terms Status**: Visual indicator for terms agreement

## Email Service Features

### Error Handling
- Network error handling with user-friendly messages
- Console logging for debugging
- Fallback to phone contact on errors

### Email Content
- HTML and text content for better compatibility
- Responsive email design
- Professional styling with brand colors
- Clickable phone numbers and email addresses
- Proper formatting for all form fields

### Form Field Formatting
- Urgency levels with color coding
- Service types with human-readable names
- Relationship types properly formatted
- Care levels and frequencies explained
- Date and time formatting

## Testing Without API Key

If you want to test the forms without setting up Brevo:
1. The forms will show an error message
2. Console will log the form data
3. Users get a fallback message to call directly

## Customization

### Email Templates
- Modify HTML templates in `email-templates/` folder
- Update the template generators in `emailService.js`
- Customize colors, fonts, and layout in the CSS

### Recipients
- Change email recipients in `emailService.js`
- Add CC/BCC recipients if needed
- Modify reply-to addresses

### Form Integration
- Forms automatically call the email service
- Success/error messages are handled
- Form reset after successful submission

## Troubleshooting

### Common Issues
1. **API Key Error**: Check that the API key is correctly set in `.env`
2. **CORS Errors**: Brevo API supports browser requests
3. **Email Not Sent**: Check Brevo dashboard for API usage and errors
4. **Missing Fields**: Verify all required form fields are mapped correctly

### Debug Mode
Enable console logging to see:
- Form data being sent
- API responses
- Error messages

The email service logs all activities to the browser console for easy debugging.
