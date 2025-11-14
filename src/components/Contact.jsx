import './Contact.css'
import { useState } from 'react'
import emailService from '../services/emailService'
import homeCopy from '../../copy/home.json'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        urgency: 'planning',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send admin notification email
            const adminResult = await emailService.sendContactFormEmail(formData);
            
            if (adminResult.success) {
                console.log('Contact form submitted successfully:', formData);
                
                // Send user confirmation email (only if user provided email)
                if (formData.email) {
                    try {
                        await emailService.sendContactConfirmationEmail(formData);
                        console.log('Contact confirmation email sent to user');
                    } catch (confirmationError) {
                        console.warn('Failed to send confirmation email to user:', confirmationError);
                        // Don't fail the whole process if confirmation email fails
                    }
                }
                
                setShowSuccessMessage(true);
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    urgency: 'planning',
                    message: ''
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to send contact form:', adminResult.error);
                alert('Sorry, there was an error sending your message. Please try again or call us directly at (832) 446-0705.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again or call us directly at (832) 446-0705.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = homeCopy.contact.contactInfo;

    return (
        <section className="contact-section">
            <div className="contact-container">
                <div className="contact-header" data-aos="fade-up">
                    <div className="contact-badge">{homeCopy.contact.badge}</div>
                    <h2 className="contact-title1">{homeCopy.contact.title}</h2>
                    <p className="contact-subtitle">
                        {homeCopy.contact.subtitle}
                    </p>
                </div>

                <div className="contact-content1">
                    <div className="contact-info" data-aos="fade-right" data-aos-delay="200">
                        <h3 className="info-title">{homeCopy.contact.infoTitle}</h3>
                        <div className="contact-items">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="contact-item">
                                    <div className="contact-icon">{item.icon}</div>
                                    <div className="contact-details">
                                        <h4 className="contact-item-title">{item.title}</h4>
                                        <p className="contact-item-details">{item.details}</p>
                                        <p className="contact-item-subtext">{item.subtext}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contact-form-wrapper" data-aos="fade-left" data-aos-delay="300">
                        {showSuccessMessage && (
                            <div className="success-message" data-aos="fade-in">
                                <div className="success-icon">✅</div>
                                <div className="success-content">
                                    <h4>Thank You for Your Message!</h4>
                                    <p>We've received your message and will get back to you within 24 hours.</p>
                                </div>
                            </div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">{homeCopy.contact.form.fullNameLabel}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder={homeCopy.contact.form.fullNamePlaceholder}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">{homeCopy.contact.form.emailLabel}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={homeCopy.contact.form.emailPlaceholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">{homeCopy.contact.form.phoneLabel}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder={homeCopy.contact.form.phonePlaceholder}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="service">{homeCopy.contact.form.serviceLabel}</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">{homeCopy.contact.form.servicePlaceholder}</option>
                                    {homeCopy.contact.form.serviceOptions.map((option, index) => (
                                        <option key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">{homeCopy.contact.form.messageLabel}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    placeholder={homeCopy.contact.form.messagePlaceholder}
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : homeCopy.contact.form.submitButton}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
