import './ReferUs.css'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import emailService from '../services/emailService'
import referUsCopy from '../../copy/referUs.json'

function ReferUs() {
    const [formData, setFormData] = useState({
        referrerName: '',
        referrerEmail: '',
        referrerPhone: '',
        referrerRelation: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientAddress: '',
        careNeeds: '',
        urgency: '',
        additionalInfo: '',
        agreeToTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send admin notification email
            const adminResult = await emailService.sendReferralFormEmail(formData);
            
            if (adminResult.success) {
                console.log('Referral submitted successfully:', formData);
                
                // Send user confirmation email (only if referrer provided email)
                if (formData.referrerEmail) {
                    try {
                        await emailService.sendReferralConfirmationEmail(formData);
                        console.log('Referral confirmation email sent to user');
                    } catch (confirmationError) {
                        console.warn('Failed to send confirmation email to user:', confirmationError);
                        // Don't fail the whole process if confirmation email fails
                    }
                }
                
                setShowSuccessMessage(true);
                
                // Reset form
                setFormData({
                    referrerName: '',
                    referrerEmail: '',
                    referrerPhone: '',
                    referrerRelation: '',
                    clientName: '',
                    clientPhone: '',
                    clientEmail: '',
                    clientAddress: '',
                    careNeeds: '',
                    urgency: '',
                    additionalInfo: '',
                    agreeToTerms: false
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to send referral form:', adminResult.error);
                alert('Sorry, there was an error submitting your referral. Please try again or call us directly at (832) 446-0705.');
            }
        } catch (error) {
            console.error('Referral form submission error:', error);
            alert('Sorry, there was an error submitting your referral. Please try again or call us directly at (832) 446-0705.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const referralBenefits = referUsCopy.whyRefer.benefits;

    const careNeedsOptions = referUsCopy.referralForm.options.careNeeds;
    const urgencyOptions = referUsCopy.referralForm.options.urgency;
    const relationOptions = referUsCopy.referralForm.options.relation;

    return (
        <div className="refer-us-page">
            <Header />
            
            {/* Hero Section */}
            <section className="refer-hero">
                <div className="refer-hero-container">
                    <div className="refer-hero-content">
                        <div className="refer-hero-text" data-aos="fade-up">
                            <div className="refer-badge">{referUsCopy.hero.badge}</div>
                            <h1 className="refer-hero-title">
                                {referUsCopy.hero.title}<br />
                                <span className="highlight">{referUsCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="refer-hero-description">
                                {referUsCopy.hero.description}
                            </p>
                            <div className="refer-stats" data-aos="fade-up" data-aos-delay="200">
                                {referUsCopy.hero.stats.map((stat, index) => (
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

            {/* Why Refer Section */}
            <section className="why-refer-section">
                <div className="why-refer-container">
                    <div className="why-refer-content">
                        <div className="why-refer-text" data-aos="fade-right">
                            <div className="section-badge">{referUsCopy.whyRefer.badge}</div>
                            <h2 className="section-title">
                                {referUsCopy.whyRefer.title} <span className="title-highlight">{referUsCopy.whyRefer.titleHighlight}</span>
                            </h2>
                            <p className="section-description">
                                {referUsCopy.whyRefer.description}
                            </p>
                            
                            <div className="benefits-list">
                                {referralBenefits.map((benefit, index) => (
                                    <div key={benefit.id} className="benefit-item" data-aos="fade-up" data-aos-delay={`${300 + (index * 100)}`}>
                                        <div className="benefit-icon">{benefit.icon}</div>
                                        <div className="benefit-content">
                                            <h4 className="benefit-title">{benefit.title}</h4>
                                            <p className="benefit-description">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="why-refer-image" data-aos="fade-left" data-aos-delay="300">
                            <img src={referUsCopy.images.hero.main} alt="Caregiver helping senior" />
                            <div className="image-overlay">
                                <div className="overlay-content">
                                    <div className="verified-icon">✓</div>
                                    <div className="overlay-text">
                                        <span className="overlay-main">{referUsCopy.whyRefer.imageOverlay.mainText}</span>
                                        <span className="overlay-sub">{referUsCopy.whyRefer.imageOverlay.subText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Referral Form Section */}
            <section className="referral-form-section">
                <div className="referral-form-container">
                    <div className="referral-form-header" data-aos="fade-up">
                        <h2 className="form-title">{referUsCopy.referralForm.title}</h2>
                        <p className="form-subtitle">
                            {referUsCopy.referralForm.subtitle}
                        </p>
                    </div>

                    {showSuccessMessage && (
                        <div className="success-message" data-aos="fade-in">
                            <div className="success-icon">✅</div>
                            <div className="success-content">
                                <h4>{referUsCopy.referralForm.successMessage.title}</h4>
                                <p>{referUsCopy.referralForm.successMessage.description}</p>
                            </div>
                        </div>
                    )}

                    <form className="referral-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                        {/* Your Information Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">{referUsCopy.referralForm.sections.yourInformation.title}</h3>
                            <p className="form-section-subtitle">{referUsCopy.referralForm.sections.yourInformation.subtitle}</p>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="referrerName">{referUsCopy.referralForm.sections.yourInformation.fields.referrerName.label}</label>
                                    <input
                                        type="text"
                                        id="referrerName"
                                        name="referrerName"
                                        value={formData.referrerName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={referUsCopy.referralForm.sections.yourInformation.fields.referrerName.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="referrerEmail">{referUsCopy.referralForm.sections.yourInformation.fields.referrerEmail.label}</label>
                                    <input
                                        type="email"
                                        id="referrerEmail"
                                        name="referrerEmail"
                                        value={formData.referrerEmail}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={referUsCopy.referralForm.sections.yourInformation.fields.referrerEmail.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="referrerPhone">{referUsCopy.referralForm.sections.yourInformation.fields.referrerPhone.label}</label>
                                    <input
                                        type="tel"
                                        id="referrerPhone"
                                        name="referrerPhone"
                                        value={formData.referrerPhone}
                                        onChange={handleInputChange}
                                        placeholder={referUsCopy.referralForm.sections.yourInformation.fields.referrerPhone.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="referrerRelation">{referUsCopy.referralForm.sections.yourInformation.fields.referrerRelation.label}</label>
                                    <select
                                        id="referrerRelation"
                                        name="referrerRelation"
                                        value={formData.referrerRelation}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">{referUsCopy.referralForm.sections.yourInformation.fields.referrerRelation.placeholder}</option>
                                        {relationOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Client Information Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">{referUsCopy.referralForm.sections.clientInformation.title}</h3>
                            <p className="form-section-subtitle">{referUsCopy.referralForm.sections.clientInformation.subtitle}</p>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="clientName">{referUsCopy.referralForm.sections.clientInformation.fields.clientName.label}</label>
                                    <input
                                        type="text"
                                        id="clientName"
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={referUsCopy.referralForm.sections.clientInformation.fields.clientName.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="clientPhone">{referUsCopy.referralForm.sections.clientInformation.fields.clientPhone.label}</label>
                                    <input
                                        type="tel"
                                        id="clientPhone"
                                        name="clientPhone"
                                        value={formData.clientPhone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={referUsCopy.referralForm.sections.clientInformation.fields.clientPhone.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="clientEmail">{referUsCopy.referralForm.sections.clientInformation.fields.clientEmail.label}</label>
                                    <input
                                        type="email"
                                        id="clientEmail"
                                        name="clientEmail"
                                        value={formData.clientEmail}
                                        onChange={handleInputChange}
                                        placeholder={referUsCopy.referralForm.sections.clientInformation.fields.clientEmail.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urgency">{referUsCopy.referralForm.sections.clientInformation.fields.urgency.label}</label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">{referUsCopy.referralForm.sections.clientInformation.fields.urgency.placeholder}</option>
                                        {urgencyOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="clientAddress">{referUsCopy.referralForm.sections.clientInformation.fields.clientAddress.label}</label>
                                <input
                                    type="text"
                                    id="clientAddress"
                                    name="clientAddress"
                                    value={formData.clientAddress}
                                    onChange={handleInputChange}
                                    placeholder={referUsCopy.referralForm.sections.clientInformation.fields.clientAddress.placeholder}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Care Needs Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">{referUsCopy.referralForm.sections.careNeeds.title}</h3>
                            <p className="form-section-subtitle">{referUsCopy.referralForm.sections.careNeeds.subtitle}</p>
                            
                            <div className="form-group">
                                <label htmlFor="careNeeds">{referUsCopy.referralForm.sections.careNeeds.fields.careNeeds.label}</label>
                                <select
                                    id="careNeeds"
                                    name="careNeeds"
                                    value={formData.careNeeds}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                >
                                    <option value="">{referUsCopy.referralForm.sections.careNeeds.fields.careNeeds.placeholder}</option>
                                    {careNeedsOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="additionalInfo">{referUsCopy.referralForm.sections.careNeeds.fields.additionalInfo.label}</label>
                                <textarea
                                    id="additionalInfo"
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder={referUsCopy.referralForm.sections.careNeeds.fields.additionalInfo.placeholder}
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                        </div>

                        {/* Terms and Submit */}
                        <div className="form-section">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <span className="checkbox-text">
                                        {referUsCopy.referralForm.terms.checkboxText}
                                    </span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className={`referral-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting || !formData.agreeToTerms}
                            >
                                {isSubmitting ? referUsCopy.referralForm.submittingButton : referUsCopy.referralForm.submitButton}
                            </button>

                            <p className="form-privacy-note">
                                {referUsCopy.referralForm.terms.privacyNote}
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            {/* Contact Section */}
            <section className="refer-contact-section">
                <div className="refer-contact-container">
                    <div className="refer-contact-content" data-aos="fade-up">
                        <h2 className="contact-title">{referUsCopy.contact.title}</h2>
                        <p className="contact-description">
                            {referUsCopy.contact.description}
                        </p>
                        <div className="contact-info-grid">
                            {referUsCopy.contact.contactInfo.map((item, index) => (
                                <div key={index} className="contact-info-item" data-aos="fade-up" data-aos-delay={200 + (index * 200)}>
                                    <div className="contact-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    {item.title === "Call Us" || item.title === "Email Us" ? (
                                        <a href={item.title === "Call Us" ? "tel:8324460705" : "mailto:referrals@journey-of-care.com"} className="contact-link">{item.details}</a>
                                    ) : (
                                        <p className="contact-text">{item.details}</p>
                                    )}
                                    <p className="contact-subtitle">{item.subtitle}</p>
                                </div>
                            ))}
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

export default ReferUs
