// Email service using Brevo API (formerly Sendinblue)
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const Admin_Email = import.meta.env.VITE_Admin_Email;
const Admin_Name = import.meta.env.VITE_Admin_Name;
const Admin_Sender = import.meta.env.VITE_ADMIN_SENDER;

console.log('Admin_Email:', Admin_Email);
console.log('Admin_Name:', Admin_Name);
// Validate API key
console.log('API Key loaded:', BREVO_API_KEY ? 'Yes' : 'No');
if (!BREVO_API_KEY) {
    console.error('VITE_BREVO_API_KEY environment variable is not set. Please check your .env file.');
}

class EmailService {
    constructor() {
        this.apiKey = BREVO_API_KEY;
        this.isConfigured = !!BREVO_API_KEY;
        
        if (!this.isConfigured) {
            console.warn('EmailService: API key not provided. Email functionality will be disabled.');
        }

        this.headers = {
            'Accept': 'application/json',
            'api-key': BREVO_API_KEY || '',
            'content-type': 'application/json'
        };

        console.log('API configured:', this.isConfigured ? 'Yes' : 'No');
    }

    async sendEmail(emailData) {
        if (!this.isConfigured) {
            console.error('EmailService: Cannot send email - API key not configured');
            return { 
                success: false, 
                error: 'Email service not configured. Please check your environment variables.' 
            };
        }

        try {
            const response = await fetch(BREVO_API_URL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(emailData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Brevo API Error:', errorData);
                throw new Error(`Failed to send email: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const result = await response.json();
            console.log('Email sent successfully:', result);
            return { success: true, data: result };
        } catch (error) {
            console.error('Email sending error:', error);
            return { success: false, error: error.message };
        }
    }

    // Contact form email
    async sendContactFormEmail(formData) {
        const emailData = {
            sender: {
                name: Admin_Name,
                email: Admin_Sender
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
            subject: `New Contact Form Submission - ${formData.urgency ? formData.urgency.toUpperCase() : 'GENERAL'}`,
            htmlContent: this.generateContactFormHTML(formData),
            textContent: this.generateContactFormText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Contact form user confirmation email
    async sendContactConfirmationEmail(formData) {
        const emailData = {
            sender: {
                name: Admin_Name,
                email: Admin_Sender
            },
            to: [
                {
                    email: formData.email,
                    name: formData.name
                }
            ],
            subject: `Thank You for Contacting ${Admin_Name}`,
            htmlContent: this.generateContactConfirmationHTML(formData),
            textContent: this.generateContactConfirmationText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Consultation/Scheduling form email
    async sendConsultationFormEmail(formData) {
        const emailData = {
            sender: {
                name: Admin_Name,
                email: Admin_Sender
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
            subject: `New Consultation Request - ${formData.urgency ? formData.urgency.toUpperCase() : 'SCHEDULED'}`,
            htmlContent: this.generateConsultationFormHTML(formData),
            textContent: this.generateConsultationFormText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Consultation form user confirmation email
    async sendConsultationConfirmationEmail(formData) {
        const emailData = {
            sender: {
                name: Admin_Name,
                email: Admin_Sender
            },
            to: [
                {
                    email: formData.email,
                    name: `${formData.firstName} ${formData.lastName}`
                }
            ],
            subject: `Consultation Request Received - ${Admin_Name}`,
            htmlContent: this.generateConsultationConfirmationHTML(formData),
            textContent: this.generateConsultationConfirmationText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Referral form email
    async sendReferralFormEmail(formData) {
        const emailData = {
            sender: {
                name: Admin_Name,
                email: Admin_Sender
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
            subject: `New Referral Submission - ${formData.urgency ? formData.urgency.toUpperCase() : 'PENDING'}`,
            htmlContent: this.generateReferralFormHTML(formData),
            textContent: this.generateReferralFormText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Referral form user confirmation email
    async sendReferralConfirmationEmail(formData) {
        const emailData = {
            sender: {
            name: Admin_Name,
                email: Admin_Sender
            },
            to: [
                {
                    email: formData.referrerEmail,
                    name: formData.referrerName
                }
            ],
            subject: `Thank You for Your Referral - ${Admin_Name}`,
            htmlContent: this.generateReferralConfirmationHTML(formData),
            textContent: this.generateReferralConfirmationText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // HTML template generators
    generateContactFormHTML(formData) {
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
                                        <div style="display: inline-block; padding: 8px 20px; border-radius: 25px; font-weight: bold; margin-bottom: 25px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; background-color: ${this.getUrgencyColor(formData.urgency)}; color: #ffffff;">⏰ ${this.formatUrgency(formData.urgency)}</div>
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
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">${this.formatService(formData.service) || 'Not specified'}</td>
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
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;">${Admin_Name} | <a href="tel:+19729998499" style="color: #ffffff; text-decoration: none; font-weight: bold;">972-999-8499</a> | ${Admin_Email}</p>
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

    generateConsultationFormHTML(formData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
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
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="700" style="max-width: 700px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1a1a1a; color: #ffffff; padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0 0 10px 0; font-size: 28px; color: #ffffff; font-family: Arial, sans-serif;">📅 New Consultation Request</h1>
                            <p style="margin: 0; opacity: 0.9; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">${Admin_Name} - Care Consultation</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px;">
                            
                            <!-- Urgency Badge -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <div style="display: inline-block; padding: 8px 20px; border-radius: 25px; font-weight: bold; margin-bottom: 25px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; background-color: ${this.getUrgencyColor(formData.urgency)}; color: #ffffff;">⏰ ${this.formatUrgency(formData.urgency)}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Contact Information Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">👤 Contact Information</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Name:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.firstName || ''} ${formData.lastName || ''}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Email:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;"><a href="mailto:${formData.email}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.email || 'Not provided'}</a></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Phone:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;"><a href="tel:${formData.phone}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.phone || 'Not provided'}</a></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Relationship:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatRelationship(formData.relationship) || 'Not specified'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Care Recipient Information Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">🏥 Care Recipient Information</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Name:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.recipientName || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Age:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.recipientAge || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Gender:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.recipientGender || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Medical Conditions:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${(formData.recipientConditions || 'None specified').replace(/\n/g, '<br>')}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Service Requirements Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">🛡️ Service Requirements</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Services Needed:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">
                    ${formData.services && formData.services.length > 0 
                                                        ? `<ul style="margin: 0; padding-left: 20px; color: #1a1a1a; font-size: 14px; font-family: Arial, sans-serif;">${formData.services.map(service => `<li style="margin-bottom: 5px;">${this.formatService(service)}</li>`).join('')}</ul>`
                        : 'No specific services selected'
                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Care Level:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatCareLevel(formData.careLevel) || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Frequency:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatFrequency(formData.frequency) || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Duration:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatDuration(formData.duration) || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Start Date:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Preferred Time:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatPreferredTime(formData.preferredTime) || 'Not specified'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Location & Additional Info Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">📍 Location & Additional Info</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Address:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.address || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">City:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.city || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Zip Code:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.zipCode || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Special Requests:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${(formData.specialRequests || 'None').replace(/\n/g, '<br>')}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Additional Info:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${(formData.additionalInfo || 'None provided').replace(/\n/g, '<br>')}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Submission Details Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">📅 Submission Details</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Submitted:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${new Date().toLocaleString()}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="text-align: center; padding: 25px 20px; background-color: #1a1a1a; color: #ffffff;">
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;">${Admin_Name} | <a href="tel:+19729998499" style="color: #ffffff; text-decoration: none; font-weight: bold;">972-999-8499</a> | ${Admin_Email}</p>
                            <p style="margin: 5px 0; opacity: 0.8; font-size: 14px; font-family: Arial, sans-serif;"><em>Please schedule consultation within 24-48 hours</em></p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    generateReferralFormHTML(formData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Referral Submission</title>
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
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="700" style="max-width: 700px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1a1a1a; color: #ffffff; padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0 0 10px 0; font-size: 28px; color: #ffffff; font-family: Arial, sans-serif;">🤝 New Referral Submission</h1>
                            <p style="margin: 0; opacity: 0.9; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">${Admin_Name} - Client Referral</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px;">
                            
                            <!-- Urgency Badge -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <div style="display: inline-block; padding: 8px 20px; border-radius: 25px; font-weight: bold; margin-bottom: 25px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; background-color: ${this.getUrgencyColor(formData.urgency)}; color: #ffffff;">⏰ ${this.formatUrgency(formData.urgency)}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Referral Highlight -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #fff3cd; border-radius: 8px; overflow: hidden; border: 1px solid #ffeaa7;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif;">🎯 Referral Summary: ${formData.referrerName || 'Anonymous'} has referred ${formData.clientName || 'a potential client'} for care services.</p>
                                    </td>
                                </tr>
                            </table>
                            <!-- Referrer Information Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">👤 Referrer Information</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Name:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.referrerName || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Email:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;"><a href="mailto:${formData.referrerEmail}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.referrerEmail || 'Not provided'}</a></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Phone:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;"><a href="tel:${formData.referrerPhone}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.referrerPhone || 'Not provided'}</a></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Relationship:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatRelationship(formData.referrerRelation) || 'Not specified'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Client Information Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">🏥 Client Information</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Name:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.clientName || 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Phone:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;"><a href="tel:${formData.clientPhone}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.clientPhone || 'Not provided'}</a></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Email:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.clientEmail ? `<a href="mailto:${formData.clientEmail}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${formData.clientEmail}</a>` : 'Not provided'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Address:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.clientAddress || 'Not provided'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Care Requirements Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">🛡️ Care Requirements</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Care Needs:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatService(formData.careNeeds) || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Timeline:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${this.formatUrgency(formData.urgency) || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Additional Info:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${(formData.additionalInfo || 'None provided').replace(/\n/g, '<br>')}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Submission Details Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 16px; font-family: Arial, sans-serif;">📅 Submission Details</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Submitted:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${new Date().toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%; font-weight: bold; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">Terms Agreed:</td>
                                                <td style="width: 70%; color: #1a1a1a; padding: 8px 0; font-size: 14px; font-family: Arial, sans-serif;">${formData.agreeToTerms ? '✅ Yes' : '❌ No'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="text-align: center; padding: 25px 20px; background-color: #1a1a1a; color: #ffffff;">
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;">${Admin_Name} | <a href="tel:+19729998499" style="color: #ffffff; text-decoration: none; font-weight: bold;">972-999-8499</a> | ${Admin_Email}</p>
                            <p style="margin: 5px 0; opacity: 0.8; font-size: 14px; font-family: Arial, sans-serif;"><em>Please contact the referred client within 24 hours</em></p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    // User confirmation HTML template generators
    generateContactConfirmationHTML(formData) {
        return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Contacting Journey of Care</title>
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
                            <p><strong>Priority Level:</strong> ${this.formatUrgency(formData.urgency)}</p>
                            <p><strong>Service Interest:</strong> ${this.formatService(formData.service) || 'General Inquiry'}</p>
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
                            <p><a href="tel:+19729998499">972-999-8499</a><br/>Available Mon-Fri 9AM-5PM, Closed Saturdays & Sundays</p>
                            <p><a href="mailto:${Admin_Email}">${Admin_Email}</a><br/>We respond to emails within 24 hours</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>${Admin_Name}</strong></p>
                        <p>Compassionate Home Care Services</p>
                        <p><a href="tel:+19729998499">972-999-8499</a> | <a href="mailto:${Admin_Email}">${Admin_Email}</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
    }

    generateConsultationConfirmationHTML(formData) {
        return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consultation Request Received - Journey of Care</title>
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
        .consultation-summary { background-color: #e8f5e8; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0; }
        .timeline-box { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 25px; margin: 30px 0; }
        .contact-section { background-color: #e3f2fd; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0; }
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
                        <p>${Admin_Name} - Your Care Journey Begins</p>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="content">
                        <div class="thank-you-section">
                            <div class="thank-you-icon">🏥</div>
                            <h2 class="thank-you-title">Thank You for Trusting Us</h2>
                            <p class="thank-you-text">We've received your consultation request and are honored that you're considering ${Admin_Name} for your loved one's needs.</p>
                        </div>
                        <div class="consultation-summary">
                            <h3>📋 Your Consultation Request</h3>
                            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Timeline:</strong> ${this.formatUrgency(formData.urgency)}</p>
                            <p><strong>Care Recipient:</strong> ${formData.recipientName || 'Not specified'}</p>
                            <p><strong>Preferred Start Date:</strong> ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}</p>
                        </div>
                        <div class="timeline-box">
                            <h3>⏰ What to Expect Next</h3>
                            <ol>
                                <li><strong>Within 4 hours:</strong> Our Care Coordinator will call you to schedule your consultation</li>
                                <li><strong>Within 24-48 hours:</strong> Free in-home consultation with our licensed team</li>
                                <li><strong>Same day:</strong> Receive your personalized care plan and pricing</li>
                                <li><strong>Care start:</strong> Begin services as soon as the next business day if needed</li>
                            </ol>
                        </div>
                        <div class="contact-section">
                            <h3>Questions Before Your Consultation?</h3>
                            <p><a href="tel:+19729998499">972-999-8499</a><br/>Available Mon-Fri 9AM-5PM, Closed Saturdays & Sundays</p>
                            <p><a href="mailto:${Admin_Email}">${Admin_Email}</a><br/>Our Care Coordinators are standing by</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>${Admin_Name}</strong></p>
                        <p>Licensed • Insured • Trusted</p>
                        <p><a href="tel:+19729998499">972-999-8499</a> | <a href="mailto:${Admin_Email}">${Admin_Email}</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
    }

    generateReferralConfirmationHTML(formData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Referral - ${Admin_Name}</title>
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
                            <h1 style="margin: 0 0 10px 0; font-size: 28px; color: #ffffff; font-family: Arial, sans-serif;">Thank You for Your Referral!</h1>
                            <p style="margin: 0; opacity: 0.9; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">${Admin_Name} - Expanding Our Circle of Care</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px;">
                            
                            <!-- Thank You Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px; text-align: center;">
                                <tr>
                                    <td>
                                        <div style="font-size: 48px; margin-bottom: 20px;">🤝</div>
                                        <h2 style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0 0 15px 0; font-family: Arial, sans-serif;">Your Referral Matters</h2>
                                        <p style="color: #666666; font-size: 16px; line-height: 24px; margin: 0; font-family: Arial, sans-serif;">Thank you for referring someone to ${Admin_Name}. Your trust in our services means everything to us.</p>
                                    </td>
                                </tr>
                </table>
                            
                            <!-- Referral Highlight -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px; background-color: #fff3cd; border-radius: 8px; overflow: hidden; border: 1px solid #ffeaa7;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif;">🎯 Referral Received</h3>
                                        <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif;">You've referred <strong>${formData.clientName || 'a potential client'}</strong> for care services.<br/>Our team will reach out to them within 24 hours.</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Next Steps -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px; background-color: #e3f2fd; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif;">🎯 What Happens Next</h3>
                                        <ol style="margin: 0; padding-left: 20px; color: #1a1a1a; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">
                                            <li style="margin-bottom: 10px;"><strong>Contact:</strong> Our referral team will call ${formData.clientName || 'them'} within 24 hours</li>
                                            <li style="margin-bottom: 10px;"><strong>Consultation:</strong> We'll schedule a free in-home assessment</li>
                                            <li style="margin-bottom: 10px;"><strong>Care Plan:</strong> A personalized care plan will be developed</li>
                                            <li style="margin-bottom: 10px;"><strong>Updates:</strong> We'll keep you informed of the progress (with permission)</li>
                                            <li style="margin-bottom: 0;"><strong>Appreciation:</strong> You'll receive a thank-you gift once services begin</li>
                            </ol>
                                    </td>
                                </tr>
                </table>
                            
                            <!-- Appreciation Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px; background-color: #d4edda; border-radius: 8px; overflow: hidden; border: 1px solid #c3e6cb;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif;">🎁 Our Referral Appreciation Program</h3>
                                        <p style="margin: 0 0 15px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif;">As a token of our gratitude, you'll receive a special thank-you gift once your referral begins services with us.</p>
                                        <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif;">Thank you for being a ${Admin_Name} advocate!</p>
                                    </td>
                                </tr>
                </table>
                            
                            <!-- Contact Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif;">Questions About Your Referral?</h3>
                                        <p style="margin: 0 0 10px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif;"><a href="tel:+19729998499" style="color: #1a1a1a; text-decoration: none; font-weight: bold;">972-999-8499</a><br/>Referral Team - Available Mon-Fri 9AM-5PM</p>
                                        <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif;"><a href="mailto:${Admin_Email}" style="color: #1a1a1a; text-decoration: none; font-weight: bold;">${Admin_Email}</a><br/>Dedicated referral support</p>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="text-align: center; padding: 25px 20px; background-color: #1a1a1a; color: #ffffff;">
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;"><strong>${Admin_Name}</strong></p>
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;">Building Trust, One Family at a Time</p>
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;"><a href="tel:+19729998499" style="color: #ffffff; text-decoration: none; font-weight: bold;">972-999-8499</a> | <a href="mailto:${Admin_Email}" style="color: #ffffff; text-decoration: none; font-weight: bold;">${Admin_Email}</a></p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    // Text content generators for fallback
    generateContactFormText(formData) {
        return `
New Contact Form Submission - ${Admin_Name}

URGENCY: ${this.formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

CONTACT INFORMATION:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Service Interested: ${this.formatService(formData.service) || 'Not specified'}

MESSAGE:
${formData.message || 'No message provided'}

---
${Admin_Name}
972-999-8499
${Admin_Email}
`;
    }

    generateConsultationFormText(formData) {
        return `
New Consultation Request - ${Admin_Name}

URGENCY: ${this.formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

CONTACT INFORMATION:
Name: ${formData.firstName || ''} ${formData.lastName || ''}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Relationship: ${this.formatRelationship(formData.relationship) || 'Not specified'}

CARE RECIPIENT:
Name: ${formData.recipientName || 'Not provided'}
Age: ${formData.recipientAge || 'Not provided'}
Gender: ${formData.recipientGender || 'Not specified'}
Medical Conditions: ${formData.recipientConditions || 'None specified'}

SERVICE REQUIREMENTS:
Services: ${formData.services && formData.services.length > 0 ? formData.services.map(s => this.formatService(s)).join(', ') : 'None selected'}
Care Level: ${this.formatCareLevel(formData.careLevel) || 'Not specified'}
Frequency: ${this.formatFrequency(formData.frequency) || 'Not specified'}
Duration: ${this.formatDuration(formData.duration) || 'Not specified'}
Start Date: ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}
Preferred Time: ${this.formatPreferredTime(formData.preferredTime) || 'Not specified'}

LOCATION:
Address: ${formData.address || 'Not provided'}
City: ${formData.city || 'Not provided'}
Zip Code: ${formData.zipCode || 'Not provided'}

ADDITIONAL INFO:
Special Requests: ${formData.specialRequests || 'None'}
Additional Information: ${formData.additionalInfo || 'None provided'}

---
${Admin_Name}
972-999-8499
${Admin_Email}
`;
    }
    generateReferralFormText(formData) {
        return `
New Referral Submission - ${Admin_Name}

URGENCY: ${this.formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

REFERRER INFORMATION:
Name: ${formData.referrerName || 'Not provided'}
Email: ${formData.referrerEmail || 'Not provided'}
Phone: ${formData.referrerPhone || 'Not provided'}
Relationship to Client: ${this.formatRelationship(formData.referrerRelation) || 'Not specified'}

CLIENT INFORMATION:
Name: ${formData.clientName || 'Not provided'}
Phone: ${formData.clientPhone || 'Not provided'}
Email: ${formData.clientEmail || 'Not provided'}
Address: ${formData.clientAddress || 'Not provided'}

CARE REQUIREMENTS:
Care Needs: ${this.formatService(formData.careNeeds) || 'Not specified'}
Timeline: ${this.formatUrgency(formData.urgency) || 'Not specified'}

ADDITIONAL INFORMATION:
${formData.additionalInfo || 'None provided'}

Terms Agreed: ${formData.agreeToTerms ? 'Yes' : 'No'}

---
${Admin_Name}
972-999-8499
${Admin_Email}
`;
    }

    // User confirmation text content generators
    generateContactConfirmationText(formData) {
        return `
Thank You for Contacting ${Admin_Name}

Dear ${formData.name || 'Valued Customer'},

Thank you for reaching out to ${Admin_Name}. We've received your message and want to assure you that your inquiry is important to us.

YOUR MESSAGE DETAILS:
- Submitted: ${new Date().toLocaleString()}
- Priority Level: ${this.formatUrgency(formData.urgency)}
- Service Interest: ${this.formatService(formData.service) || 'General Inquiry'}

WHAT HAPPENS NEXT:
1. Review: Our team will carefully review your message and needs
2. Response: We'll contact you within 24 hours (sooner for urgent requests)
3. Consultation: We'll schedule a free consultation to discuss your specific needs
4. Care Plan: Together, we'll create a personalized care plan that's right for you

NEED IMMEDIATE ASSISTANCE?
Phone: 972-999-8499 - Available Mon-Fri 9AM-5PM, Closed Saturdays & Sundays
Email: ${Admin_Email} - We respond within 24 hours

${Admin_Name}
Compassionate Home Care Services
Houston & Gulf Coast counties
`;
    }

    generateConsultationConfirmationText(formData) {
        return `
Consultation Request Received - ${Admin_Name}

Dear ${formData.firstName || ''} ${formData.lastName || ''},

Thank you for trusting ${Admin_Name} with your loved one's care needs. We've received your consultation request and are honored to be considered for this important responsibility.

YOUR CONSULTATION REQUEST:
- Submitted: ${new Date().toLocaleString()}
- Timeline: ${this.formatUrgency(formData.urgency)}
- Care Recipient: ${formData.recipientName || 'Not specified'}
- Preferred Start Date: ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}

WHAT TO EXPECT NEXT:
1. Within 4 hours: Our Care Coordinator will call you to schedule your consultation
2. Within 24-48 hours: Free in-home consultation with our licensed team
3. Same day: Receive your personalized care plan and pricing
4. Care start: Begin services as soon as the next business day if needed

QUESTIONS BEFORE YOUR CONSULTATION?
Phone: 972-999-8499 - Available Mon-Fri 9AM-5PM, Closed Saturdays & Sundays
Email: ${Admin_Email} - Our Care Coordinators are standing by

${Admin_Name}
Licensed • Insured • Trusted
Houston & Gulf Coast counties
`;
    }

    generateReferralConfirmationText(formData) {
        return `
Thank You for Your Referral - ${Admin_Name}

Dear ${formData.referrerName || 'Valued Advocate'},

Thank you for referring someone to ${Admin_Name}. Your trust in our services means everything to us, and we're honored to extend our compassionate care to another family through your recommendation.

REFERRAL RECEIVED:
You've referred ${formData.clientName || 'a potential client'} for care services.
Our team will reach out to them within 24 hours.

WHAT HAPPENS NEXT:
1. Contact: Our referral team will call ${formData.clientName || 'them'} within 24 hours
2. Consultation: We'll schedule a free in-home assessment
3. Care Plan: A personalized care plan will be developed
4. Updates: We'll keep you informed of the progress (with permission)
5. Appreciation: You'll receive a thank-you gift once services begin

REFERRAL APPRECIATION PROGRAM:
As a token of our gratitude, you'll receive a special thank-you gift once your referral begins services with us. But more importantly, you've helped us extend compassionate care to another family in need.

Thank you for being a ${Admin_Name} advocate!

QUESTIONS ABOUT YOUR REFERRAL?
Phone: 972-999-8499 - Referral Team, Available Mon-Fri 9AM-5PM
Email: ${Admin_Email} - Dedicated referral support

${Admin_Name}
Building Trust, One Family at a Time
Houston & Gulf Coast counties
`;
    }

    // Helper methods for formatting
    getUrgencyColor(urgency) {
        const colorMap = {
            'immediate': '#dc3545',
            'urgent': '#dc3545',
            'soon': '#fd7e14',
            'planning': '#28a745'
        };
        return colorMap[urgency] || '#28a745';
    }

    formatUrgency(urgency) {
        const urgencyMap = {
            'immediate': 'IMMEDIATE (Within 24 hours)',
            'urgent': 'URGENT (Within 3 days)',
            'soon': 'SOON (Within a week)',
            'planning': 'PLANNING AHEAD'
        };
        return urgencyMap[urgency] || 'Not specified';
    }

    formatService(service) {
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

    formatRelationship(relationship) {
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

    formatCareLevel(level) {
        const levelMap = {
            'minimal': 'Minimal Assistance',
            'moderate': 'Moderate Care',
            'extensive': 'Extensive Care',
            'intensive': 'Intensive Care'
        };
        return levelMap[level] || level;
    }

    formatFrequency(frequency) {
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

    formatDuration(duration) {
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

    formatPreferredTime(time) {
        const timeMap = {
            'morning': 'Morning (6 AM - 12 PM)',
            'afternoon': 'Afternoon (12 PM - 6 PM)',
            'evening': 'Evening (6 PM - 10 PM)',
            'overnight': 'Overnight (10 PM - 6 AM)',
            'flexible': 'Flexible'
        };
        return timeMap[time] || time;
    }

    // Newsletter subscription email
    async sendNewsletterSubscriptionEmail(emailData) {
        const emailPayload = {
            sender: {
                name: `${Admin_Name} Newsletter`,
                email: Admin_Sender
            },
            to: [
                {
                    email: Admin_Email,
                    name: `${Admin_Name} Team`
                }
            ],
            subject: "New Newsletter Subscription",
            htmlContent: this.generateNewsletterSubscriptionHTML(emailData),
            textContent: this.generateNewsletterSubscriptionText(emailData)
        };

        return await this.sendEmail(emailPayload);
    }

    // Newsletter subscription HTML template
    generateNewsletterSubscriptionHTML(emailData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Subscription</title>
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
                            <h1 style="margin: 0 0 10px 0; font-size: 28px; color: #ffffff; font-family: Arial, sans-serif;">📧 New Newsletter Subscription</h1>
                            <p style="margin: 0; opacity: 0.9; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">${Admin_Name} - Newsletter Signup</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px;">
                            
                            <!-- Email Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">📧 Email Address</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; margin: 0; background-color: #ffffff; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">
                                        <a href="mailto:${emailData.email}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">${emailData.email}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Submission Date Field -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                                <tr>
                                    <td style="font-weight: bold; color: #ffffff; background-color: #1a1a1a; padding: 12px 15px; margin: 0; font-size: 14px; font-family: Arial, sans-serif;">📅 Subscription Date</td>
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
                            <p style="margin: 5px 0; font-family: Arial, sans-serif;">${Admin_Name} | <a href="tel:+19729998499" style="color: #ffffff; text-decoration: none; font-weight: bold;">972-999-8499</a> | ${Admin_Email}</p>
                            <p style="margin: 5px 0; opacity: 0.8; font-size: 14px; font-family: Arial, sans-serif;"><em>New newsletter subscriber added to mailing list</em></p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    // Newsletter subscription text template
    generateNewsletterSubscriptionText(emailData) {
        return `
New Newsletter Subscription - ${Admin_Name}

SUBSCRIPTION DETAILS:
Email: ${emailData.email}
Date: ${new Date().toLocaleString()}

---
${Admin_Name}
972-999-8499
${Admin_Email}
`;
    }
}

// Export a singleton instance
const emailService = new EmailService();

export default emailService;
