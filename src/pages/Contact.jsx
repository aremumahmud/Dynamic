import './Contact.css'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import emailService from '../services/emailService'
import contactCopy from '../../copy/contact.json'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        urgency: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

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
                    urgency: '',
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

    const contactInfo = contactCopy.contactInfo.contactItems;
    const serviceOptions = contactCopy.contactForm.options.services;
    const urgencyOptions = contactCopy.contactForm.options.urgency;

    return (
        <div className="contact-page">
            <Header />
            
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-container">
                    <div className="contact-hero-content">
                        <div className="contact-hero-text" data-aos="fade-up">
                            <div className="contact-badge">{contactCopy.hero.badge}</div>
                            <h1 className="contact-hero-title">
                                {contactCopy.hero.title}<br />
                                <span className="highlight1">{contactCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="contact-hero-description">
                                {contactCopy.hero.description}
                            </p>
                            <div className="contact-stats" data-aos="fade-up" data-aos-delay="200">
                                {contactCopy.hero.stats.map((stat, index) => (
                                    <div key={index} className="stat">
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="contact-main-section">
                <div className="contact-main-container">
                    <div className="contact-main-content">
                        {/* Contact Information */}
                        <div className="contact-info-section" data-aos="fade-right">
                            <div className="contact-info-header">
                                <h2 className="info-section-title">{contactCopy.contactInfo.title}</h2>
                                <p className="info-section-subtitle">
                                    {contactCopy.contactInfo.subtitle}
                                </p>
                            </div>
                            
                            <div className="contact-info-grid1">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="contact-info-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <div className="contact-card-icon">{item.icon}</div>
                                        <div className="contact-card-content">
                                            <h3 className="contact-card-title">{item.title}</h3>
                                            {item.link ? (
                                                <a href={item.link} className="contact-card-link">
                                                    {item.details}
                                                </a>
                                            ) : (
                                                <p className="contact-card-details">{item.details}</p>
                                            )}
                                            <p className="contact-card-subtext">{item.subtext}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="emergency-notice" data-aos="fade-up" data-aos-delay="400">
                                <div className="emergency-icon">🚨</div>
                                <div className="emergency-content">
                                    <h4 className="emergency-title">{contactCopy.contactInfo.emergencyNotice.title}</h4>
                                    <p className="emergency-text">
                                        {contactCopy.contactInfo.emergencyNotice.text}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-section" data-aos="fade-left" data-aos-delay="300">
                            <div className="contact-form-header">
                                <h2 className="form-section-title">{contactCopy.contactForm.title}</h2>
                                <p className="form-section-subtitle">
                                    {contactCopy.contactForm.subtitle}
                                </p>
                            </div>

                            {showSuccessMessage && (
                                <div className="success-message" data-aos="fade-in">
                                    <div className="success-icon">✅</div>
                                    <div className="success-content">
                                        <h4>{contactCopy.contactForm.successMessage.title}</h4>
                                        <p>{contactCopy.contactForm.successMessage.description}</p>
                                    </div>
                                </div>
                            )}

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">{contactCopy.contactForm.fields.name.label}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={contactCopy.contactForm.fields.name.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">{contactCopy.contactForm.fields.email.label}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={contactCopy.contactForm.fields.email.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">{contactCopy.contactForm.fields.phone.label}</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder={contactCopy.contactForm.fields.phone.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="urgency">{contactCopy.contactForm.fields.urgency.label}</label>
                                        <select
                                            id="urgency"
                                            name="urgency"
                                            value={formData.urgency}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">{contactCopy.contactForm.fields.urgency.placeholder}</option>
                                            {urgencyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">{contactCopy.contactForm.fields.service.label}</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    >
                                        <option value="">{contactCopy.contactForm.fields.service.placeholder}</option>
                                        {serviceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">{contactCopy.contactForm.fields.message.label}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        placeholder={contactCopy.contactForm.fields.message.placeholder}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? contactCopy.contactForm.submittingButton : contactCopy.contactForm.submitButton}
                                </button>

                                <p className="form-privacy-note">
                                    {contactCopy.contactForm.privacyNote}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            <Footer />
        </div>
    )
}

export default Contact
