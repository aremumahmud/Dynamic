// Backend API endpoint for sending emails via Brevo
// This keeps the API key secure on the server side

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const Admin_Email = process.env.ADMIN_EMAIL;
const Admin_Name = process.env.ADMIN_NAME;
const Admin_Phone = process.env.ADMIN_PHONE || '972-999-8499'; // Default fallback
// Format phone for tel: links (remove spaces, parentheses, but keep +)
const Admin_Phone_Tel = Admin_Phone.replace(/[\s()-]/g, '');

// Helper methods for formatting
function getUrgencyColor(urgency) {
    const colorMap = {
        'immediate': '#dc3545',
        'urgent': '#dc3545',
        'soon': '#fd7e14',
        'planning': '#28a745'
    };
    return colorMap[urgency] || '#28a745';
}

function formatUrgency(urgency) {
    const urgencyMap = {
        'immediate': 'IMMEDIATE (Within 24 hours)',
        'urgent': 'URGENT (Within 3 days)',
        'soon': 'SOON (Within a week)',
        'planning': 'PLANNING AHEAD'
    };
    return urgencyMap[urgency] || 'Not specified';
}

function formatService(service) {
    const serviceMap = {
        'personal-care': 'Personal Care Services',
        'companion-care': 'Companion Care',
        'respite-care': 'Respite Care',
        'specialized-care': 'Specialized Care',
        'inclusive-care': 'Inclusive Care for All Abilities',
        'in-facility-care': 'In-Facility Care',
        'consultation': 'Free Consultation',
        'assessment': 'Care Assessment',
        'not-sure': 'Need Consultation',
        'other': 'Other'
    };
    return serviceMap[service] || service;
}

function formatRelationship(relationship) {
    const relationshipMap = {
        'family': 'Family Member',
        'friend': 'Friend',
        'neighbor': 'Neighbor',
        'healthcare-provider': 'Healthcare Provider',
        'social-worker': 'Social Worker',
        'current-client': 'Current Client',
        'former-client': 'Former Client',
        'self': 'Self',
        'spouse': 'Spouse/Partner',
        'child': 'Adult Child',
        'parent': 'Parent',
        'sibling': 'Sibling',
        'other': 'Other'
    };
    return relationshipMap[relationship] || relationship;
}

function formatCareLevel(level) {
    const levelMap = {
        'minimal': 'Minimal Assistance',
        'moderate': 'Moderate Care',
        'extensive': 'Extensive Care',
        'intensive': 'Intensive Care'
    };
    return levelMap[level] || level;
}

function formatFrequency(frequency) {
    const frequencyMap = {
        'daily': 'Daily',
        'few-times-week': 'Few times per week',
        'weekly': 'Weekly',
        'bi-weekly': 'Bi-weekly',
        'monthly': 'Monthly',
        'as-needed': 'As needed'
    };
    return frequencyMap[frequency] || frequency;
}

function formatDuration(duration) {
    const durationMap = {
        '2-4-hours': '2-4 hours',
        '4-8-hours': '4-8 hours',
        '8-12-hours': '8-12 hours',
        '12-24-hours': '12-24 hours',
        'overnight': 'Overnight',
        'live-in': 'Live-in'
    };
    return durationMap[duration] || duration;
}

function formatPreferredTime(time) {
    const timeMap = {
        'morning': 'Morning (6 AM - 12 PM)',
        'afternoon': 'Afternoon (12 PM - 6 PM)',
        'evening': 'Evening (6 PM - 10 PM)',
        'overnight': 'Overnight (10 PM - 6 AM)',
        'flexible': 'Flexible'
    };
    return timeMap[time] || time;
}

// HTML template generators
function generateContactFormHTML(formData) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1a1a1a; color: #ffffff; padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0 0 10px 0; font-size: 28px; color: #ffffff; font-family: Arial, sans-serif;">🏥 New Contact Form Submission</h1>
                            <p style="margin: 0; opacity: 0.9; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">${Admin_Name} - Contact Request</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px;">
                            
                            <!-- Urgency Badge -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <div style="display: inline-block; padding: 8px 20px; border-radius: 25px; font-weight: bold; margin-bottom: 25px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; background-color: ${getUrgencyColor(formData.urgency)}; color: #ffffff;">⏰ ${formatUrgency(formData.urgency)}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Full Name Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">👤 Full Name</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">${formData.name || 'Not provided'}</td>
                                </tr>
                            </table>
                            
                            <!-- Email Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">📧 Email Address</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">
                                        <a href="mailto:${formData.email}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.email || 'Not provided'}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Phone Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">📞 Phone Number</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">
                                        <a href="tel:${formData.phone}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.phone || 'Not provided'}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Service Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">🏥 Service of Interest</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">${formatService(formData.service) || 'Not specified'}</td>
                                </tr>
                            </table>
                            
                            <!-- Message Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">💬 Message</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">
                                        ${(formData.message || 'No message provided').replace(/\n/g, '<br>')}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Submission Date Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">📅 Submission Date</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">${new Date().toLocaleString()}</td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="text-align: center; padding: 25px 20px; background-color: #1a1a1a; color: #ffffff;">
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;">${Admin_Name} | <a href="tel:${Admin_Phone_Tel}" style="color: #ffffff; text-decoration: none; font-weight: bold;">${Admin_Phone}</a> | ${Admin_Email}</p>
                            <p style="margin: 5px 0; opacity: 0.8; font-size: 14px; font-family: Arial, sans-serif;"><em>Please respond within 24 hours for urgent requests</em></p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// Additional HTML generators would go here - keeping it concise for now
// You can add the other template generators (consultation, referral, confirmations) as needed

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate API key is configured
    if (!BREVO_API_KEY) {
        console.error('BREVO_API_KEY environment variable is not set');
        return res.status(500).json({ 
            success: false, 
            error: 'Email service not configured. Please check server environment variables.' 
        });
    }

    try {
        const { emailType, formData } = req.body;

        if (!emailType || !formData) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: emailType and formData' 
            });
        }

        let emailPayload;

        // Build email payload based on type
        switch (emailType) {
            case 'contact':
                emailPayload = {
                    sender: {
                        name: Admin_Name,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: Admin_Email,
                            name: Admin_Name
                        }
                    ],
                    replyTo: {
                        email: formData.email,
                        name: formData.name
                    },
                    subject: `New Contact Form Submission - ${formData.urgency ? formatUrgency(formData.urgency) : 'GENERAL'}`,
                    htmlContent: generateContactFormHTML(formData),
                    textContent: generateContactFormText(formData)
                };
                break;

            case 'contact-confirmation':
                emailPayload = {
                    sender: {
                        name: Admin_Name,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: formData.email,
                            name: formData.name
                        }
                    ],
                    subject: `Thank You for Contacting ${Admin_Name}`,
                    htmlContent: generateContactConfirmationHTML(formData),
                    textContent: generateContactConfirmationText(formData)
                };
                break;

            case 'consultation':
                emailPayload = {
                    sender: {
                        name: Admin_Name,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: Admin_Email,
                            name: Admin_Name
                        }
                    ],
                    replyTo: {
                        email: formData.email,
                        name: `${formData.firstName} ${formData.lastName}`
                    },
                    subject: `New Consultation Request - ${formData.urgency ? formatUrgency(formData.urgency) : 'SCHEDULED'}`,
                    htmlContent: generateConsultationFormHTML(formData),
                    textContent: generateConsultationFormText(formData)
                };
                break;

            case 'consultation-confirmation':
                emailPayload = {
                    sender: {
                        name: Admin_Name,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: formData.email,
                            name: `${formData.firstName} ${formData.lastName}`
                        }
                    ],
                    subject: `Consultation Request Received - ${Admin_Name}`,
                    htmlContent: generateConsultationConfirmationHTML(formData),
                    textContent: generateConsultationConfirmationText(formData)
                };
                break;

            case 'referral':
                emailPayload = {
                    sender: {
                        name: Admin_Name,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: Admin_Email,
                            name: Admin_Name
                        }
                    ],
                    replyTo: {
                        email: formData.referrerEmail,
                        name: formData.referrerName
                    },
                    subject: `New Referral Submission - ${formData.urgency ? formatUrgency(formData.urgency) : 'PENDING'}`,
                    htmlContent: generateReferralFormHTML(formData),
                    textContent: generateReferralFormText(formData)
                };
                break;

            case 'referral-confirmation':
                emailPayload = {
                    sender: {
                        name: Admin_Name,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: formData.referrerEmail,
                            name: formData.referrerName
                        }
                    ],
                    subject: `Thank You for Your Referral - ${Admin_Name}`,
                    htmlContent: generateReferralConfirmationHTML(formData),
                    textContent: generateReferralConfirmationText(formData)
                };
                break;

            case 'newsletter':
                emailPayload = {
                    sender: {
                        name: `${Admin_Name} Newsletter`,
                        email: Admin_Email
                    },
                    to: [
                        {
                            email: Admin_Email,
                            name: `${Admin_Name} Team`
                        }
                    ],
                    subject: "New Newsletter Subscription",
                    htmlContent: generateNewsletterSubscriptionHTML(formData),
                    textContent: generateNewsletterSubscriptionText(formData)
                };
                break;

            default:
                return res.status(400).json({ 
                    success: false, 
                    error: `Unsupported email type: ${emailType}` 
                });
        }

        // Send email via Brevo API
        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Brevo API Error:', errorData);
            return res.status(response.status).json({ 
                success: false, 
                error: `Failed to send email: ${response.status} - ${errorData.message || 'Unknown error'}` 
            });
        }

        const result = await response.json();
        console.log('Email sent successfully:', result);
        
        return res.status(200).json({ 
            success: true, 
            data: result 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

// Text content generators (simplified versions - add full versions as needed)
function generateContactFormText(formData) {
    return `
New Contact Form Submission - ${Admin_Name}

URGENCY: ${formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

CONTACT INFORMATION:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Service Interested: ${formatService(formData.service) || 'Not specified'}

MESSAGE:
${formData.message || 'No message provided'}

---
${Admin_Name}
${Admin_Phone}
${Admin_Email}
`;
}

function generateContactConfirmationHTML(formData) {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Contacting ${Admin_Name}</title>
    <style type="text/css">
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a1a1a; padding: 40px 30px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 10px 0; font-weight: bold; }
        .header p { color: #cccccc; font-size: 16px; margin: 0; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .thank-you-section { text-align: center; margin-bottom: 30px; }
        .thank-you-icon { font-size: 48px; margin-bottom: 20px; }
        .thank-you-title { color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0 0 15px 0; }
        .thank-you-text { color: #666666; font-size: 16px; line-height: 24px; margin: 0; }
        .info-box { background-color: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 20px; margin: 30px 0; }
        .next-steps { background-color: #e3f2fd; border-radius: 8px; padding: 25px; margin: 30px 0; }
        .contact-section { background-color: #f8f9fa; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0; }
        .footer { background-color: #1a1a1a; padding: 30px; text-align: center; }
        .footer p { color: #cccccc; font-size: 14px; margin: 5px 0; }
        .footer a { color: #ffffff; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr><td>
            <div class="email-container">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="header">
                        <h1>Thank You for Reaching Out!</h1>
                        <p>${Admin_Name} - We've Received Your Message</p>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="content">
                        <div class="thank-you-section">
                            <div class="thank-you-icon">💙</div>
                            <h2 class="thank-you-title">We're Here to Help</h2>
                            <p class="thank-you-text">Thank you for contacting ${Admin_Name}. Your message is important to us, and we're committed to providing you with the compassionate care and support you need.</p>
                        </div>
                        <div class="info-box">
                            <h3>📋 Your Message Details</h3>
                            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Priority Level:</strong> ${formatUrgency(formData.urgency)}</p>
                            <p><strong>Service Interest:</strong> ${formatService(formData.service) || 'General Inquiry'}</p>
                        </div>
                        <div class="next-steps">
                            <h3>🎯 What Happens Next?</h3>
                            <ol>
                                <li><strong>Review:</strong> Our team will carefully review your message and needs</li>
                                <li><strong>Response:</strong> We'll contact you within 24 hours (sooner for urgent requests)</li>
                                <li><strong>Consultation:</strong> We'll schedule a free consultation to discuss your specific needs</li>
                                <li><strong>Care Plan:</strong> Together, we'll create a personalized care plan that's right for you</li>
                            </ol>
                        </div>
                        <div class="contact-section">
                            <h3>Need Immediate Assistance?</h3>
                            <p><a href="tel:${Admin_Phone_Tel}">${Admin_Phone}</a><br/>Available Mon-Fri 9:30AM-5:30PM, Closed Saturdays & Sundays</p>
                            <p><a href="mailto:${Admin_Email}">${Admin_Email}</a><br/>We respond to emails within 24 hours</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>${Admin_Name}</strong></p>
                        <p>Compassionate Home Care Services</p>
                        <p><a href="tel:${Admin_Phone_Tel}">${Admin_Phone}</a> | <a href="mailto:${Admin_Email}">${Admin_Email}</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
}

function generateContactConfirmationText(formData) {
    return `
Thank You for Contacting ${Admin_Name}

Dear ${formData.name || 'Valued Customer'},

Thank you for reaching out to ${Admin_Name}. We've received your message and want to assure you that your inquiry is important to us.

YOUR MESSAGE DETAILS:
- Submitted: ${new Date().toLocaleString()}
- Priority Level: ${formatUrgency(formData.urgency)}
- Service Interest: ${formatService(formData.service) || 'General Inquiry'}

WHAT HAPPENS NEXT:
1. Review: Our team will carefully review your message and needs
2. Response: We'll contact you within 24 hours (sooner for urgent requests)
3. Consultation: We'll schedule a free consultation to discuss your specific needs
4. Care Plan: Together, we'll create a personalized care plan that's right for you

NEED IMMEDIATE ASSISTANCE?
Phone: ${Admin_Phone} - Available Mon-Fri 9:30AM-5:30PM, Closed Saturdays & Sundays
Email: ${Admin_Email} - We respond within 24 hours

${Admin_Name}
Compassionate Home Care Services
`;
}

// Consultation form templates
function generateConsultationFormHTML(formData) {
    // This is a large template - using a simplified version for now
    // You can copy the full template from emailService.js if needed
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>New Consultation Request</title></head><body style="font-family: Arial, sans-serif; padding: 20px;"><h1>New Consultation Request - ${Admin_Name}</h1><p><strong>Name:</strong> ${formData.firstName || ''} ${formData.lastName || ''}</p><p><strong>Email:</strong> ${formData.email || 'Not provided'}</p><p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p><p><strong>Care Recipient:</strong> ${formData.recipientName || 'Not provided'}</p><p><strong>Urgency:</strong> ${formatUrgency(formData.urgency)}</p><p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p></body></html>`;
}

function generateConsultationFormText(formData) {
    return `
New Consultation Request - ${Admin_Name}

URGENCY: ${formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

CONTACT INFORMATION:
Name: ${formData.firstName || ''} ${formData.lastName || ''}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Relationship: ${formatRelationship(formData.relationship) || 'Not specified'}

CARE RECIPIENT:
Name: ${formData.recipientName || 'Not provided'}
Age: ${formData.recipientAge || 'Not provided'}
Gender: ${formData.recipientGender || 'Not specified'}

SERVICE REQUIREMENTS:
Services: ${formData.services && formData.services.length > 0 ? formData.services.map(s => formatService(s)).join(', ') : 'None selected'}
Care Level: ${formatCareLevel(formData.careLevel) || 'Not specified'}
Frequency: ${formatFrequency(formData.frequency) || 'Not specified'}

---
${Admin_Name}
${Admin_Phone}
${Admin_Email}
`;
}

function generateConsultationConfirmationHTML(formData) {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consultation Request Received - ${Admin_Name}</title>
    <style type="text/css">
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a1a1a; padding: 40px 30px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 10px 0; font-weight: bold; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .thank-you-section { text-align: center; margin-bottom: 30px; }
        .consultation-summary { background-color: #e8f5e8; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0; }
        .footer { background-color: #1a1a1a; padding: 30px; text-align: center; }
        .footer p { color: #cccccc; font-size: 14px; margin: 5px 0; }
        .footer a { color: #ffffff; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr><td>
            <div class="email-container">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="header">
                        <h1>Consultation Request Received</h1>
                        <p style="color: #cccccc;">${Admin_Name} - Your Care Journey Begins</p>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="content">
                        <div class="thank-you-section">
                            <div style="font-size: 48px; margin-bottom: 20px;">🏥</div>
                            <h2 style="color: #1a1a1a; font-size: 24px; font-weight: bold;">Thank You for Trusting Us</h2>
                            <p style="color: #666666; font-size: 16px;">We've received your consultation request and are honored that you're considering ${Admin_Name} for your loved one's needs.</p>
                        </div>
                        <div class="consultation-summary">
                            <h3>📋 Your Consultation Request</h3>
                            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Timeline:</strong> ${formatUrgency(formData.urgency)}</p>
                            <p><strong>Care Recipient:</strong> ${formData.recipientName || 'Not specified'}</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>${Admin_Name}</strong></p>
                        <p><a href="tel:${Admin_Phone_Tel}">${Admin_Phone}</a> | <a href="mailto:${Admin_Email}">${Admin_Email}</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
}

function generateConsultationConfirmationText(formData) {
    return `
Consultation Request Received - ${Admin_Name}

Dear ${formData.firstName || ''} ${formData.lastName || ''},

Thank you for trusting ${Admin_Name} with your loved one's care needs.

YOUR CONSULTATION REQUEST:
- Submitted: ${new Date().toLocaleString()}
- Timeline: ${formatUrgency(formData.urgency)}
- Care Recipient: ${formData.recipientName || 'Not specified'}

WHAT TO EXPECT NEXT:
1. Within 4 hours: Our Care Coordinator will call you
2. Within 24-48 hours: Free in-home consultation
3. Same day: Receive your personalized care plan

${Admin_Name}
${Admin_Phone}
${Admin_Email}
`;
}

// Referral form templates
function generateReferralFormHTML(formData) {
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>New Referral Submission</title></head><body style="font-family: Arial, sans-serif; padding: 20px;"><h1>New Referral Submission - ${Admin_Name}</h1><p><strong>Referrer:</strong> ${formData.referrerName || 'Not provided'}</p><p><strong>Client:</strong> ${formData.clientName || 'Not provided'}</p><p><strong>Urgency:</strong> ${formatUrgency(formData.urgency)}</p><p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p></body></html>`;
}

function generateReferralFormText(formData) {
    return `
New Referral Submission - ${Admin_Name}

REFERRER: ${formData.referrerName || 'Not provided'}
CLIENT: ${formData.clientName || 'Not provided'}
URGENCY: ${formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

---
${Admin_Name}
${Admin_Phone}
${Admin_Email}
`;
}

function generateReferralConfirmationHTML(formData) {
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Thank You for Your Referral</title></head><body style="font-family: Arial, sans-serif; padding: 20px;"><h1>Thank You for Your Referral!</h1><p>Dear ${formData.referrerName || 'Valued Advocate'},</p><p>Thank you for referring ${formData.clientName || 'a potential client'} to ${Admin_Name}.</p><p>Our team will reach out to them within 24 hours.</p><p>${Admin_Name}</p></body></html>`;
}

function generateReferralConfirmationText(formData) {
    return `
Thank You for Your Referral - ${Admin_Name}

Dear ${formData.referrerName || 'Valued Advocate'},

Thank you for referring ${formData.clientName || 'a potential client'} to ${Admin_Name}.

Our team will reach out to them within 24 hours.

${Admin_Name}
${Admin_Phone}
${Admin_Email}
`;
}

// Newsletter subscription templates
function generateNewsletterSubscriptionHTML(formData) {
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>New Newsletter Subscription</title></head><body style="font-family: Arial, sans-serif; padding: 20px;"><h1>📧 New Newsletter Subscription</h1><p><strong>Email:</strong> ${formData.email}</p><p><strong>Date:</strong> ${new Date().toLocaleString()}</p><p>${Admin_Name}</p></body></html>`;
}

function generateNewsletterSubscriptionText(formData) {
    return `
New Newsletter Subscription - ${Admin_Name}

Email: ${formData.email}
Date: ${new Date().toLocaleString()}

---
${Admin_Name}
${Admin_Phone}
${Admin_Email}
`;
}

