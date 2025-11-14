import './Scheduling.css'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { servicesList } from '../data/servicesData'
import emailService from '../services/emailService'
import schedulingCopy from '../../copy/scheduling.json'

function Scheduling() {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        relationship: '',
        
        // Care Recipient Information
        recipientName: '',
        recipientAge: '',
        recipientGender: '',
        recipientConditions: '',
        
        // Service Details
        services: [],
        careLevel: '',
        frequency: '',
        duration: '',
        startDate: '',
        preferredTime: '',
        urgency: '',
        
        // Location & Preferences
        address: '',
        city: 'Conroe',
        zipCode: '',
        specialRequests: '',
        additionalInfo: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox' && name === 'services') {
            setFormData(prev => ({
                ...prev,
                services: checked 
                    ? [...prev.services, value]
                    : prev.services.filter(service => service !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send admin notification email
            const adminResult = await emailService.sendConsultationFormEmail(formData);
            
            if (adminResult.success) {
                console.log('Consultation request submitted successfully:', formData);
                
                // Send user confirmation email (only if user provided email)
                if (formData.email) {
                    try {
                        await emailService.sendConsultationConfirmationEmail(formData);
                        console.log('Consultation confirmation email sent to user');
                    } catch (confirmationError) {
                        console.warn('Failed to send confirmation email to user:', confirmationError);
                        // Don't fail the whole process if confirmation email fails
                    }
                }
                
                setShowSuccessMessage(true);
                
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    relationship: '',
                    recipientName: '',
                    recipientAge: '',
                    recipientGender: '',
                    recipientConditions: '',
                    services: [],
                    careLevel: '',
                    frequency: '',
                    duration: '',
                    startDate: '',
                    preferredTime: '',
                    urgency: '',
                    address: '',
                    city: 'Conroe',
                    zipCode: '',
                    specialRequests: '',
                    additionalInfo: ''
                });
                setCurrentStep(1);

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to send consultation form:', adminResult.error);
                alert('Sorry, there was an error submitting your consultation request. Please try again or call us directly at (832) 446-0705.');
            }
        } catch (error) {
            console.error('Consultation form submission error:', error);
            alert('Sorry, there was an error submitting your consultation request. Please try again or call us directly at (832) 446-0705.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const relationshipOptions = schedulingCopy.form.options.relationship;
    const careLevelOptions = schedulingCopy.form.options.careLevel;
    const frequencyOptions = schedulingCopy.form.options.frequency;
    const timeOptions = schedulingCopy.form.options.time;
    const urgencyOptions = schedulingCopy.form.options.urgency;
    const steps = schedulingCopy.form.steps;

    return (
        <div className="scheduling-page">
            <Header />
            
            {/* Hero Section */}
            <section className="scheduling-hero">
                <div className="scheduling-hero-container">
                    <div className="scheduling-hero-content">
                        <div className="scheduling-hero-text" data-aos="fade-up">
                            <div className="scheduling-badge">{schedulingCopy.hero.badge}</div>
                            <h1 className="scheduling-hero-title">
                                {schedulingCopy.hero.title}<br />
                                <span className="highlight1">{schedulingCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="scheduling-hero-description">
                                {schedulingCopy.hero.description}
                            </p>
                            <div className="scheduling-stats" data-aos="fade-up" data-aos-delay="200">
                                {schedulingCopy.hero.stats.map((stat, index) => (
                                    <div key={index} className="stat">
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="scheduling-hero-image" data-aos="fade-left" data-aos-delay="300">
                            <img src={schedulingCopy.images.hero.main} alt="Compassionate Care" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Scheduling Form Section */}
            <section className="scheduling-form-section">
                <div className="scheduling-form-container">
                    {/* Progress Indicator */}
                    <div className="progress-indicator" data-aos="fade-up">
                        <div className="steps-container">
                            {steps.map((step) => (
                                <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                                    <div className="step-number">
                                        {currentStep > step.number ? '✓' : step.number}
                                    </div>
                                    <div className="step-info">
                                        <div className="step-title">{step.title}</div>
                                        <div className="step-description">{step.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccessMessage && (
                        <div className="success-message" data-aos="fade-in">
                            <div className="success-icon">🎉</div>
                            <div className="success-content">
                                <h3>{schedulingCopy.form.successMessage.title}</h3>
                                <p>{schedulingCopy.form.successMessage.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form className="scheduling-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">{schedulingCopy.form.step1.title}</h2>
                                    <p className="step-subtitle">{schedulingCopy.form.step1.subtitle}</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName">{schedulingCopy.form.step1.fields.firstName.label}</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={schedulingCopy.form.step1.fields.firstName.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">{schedulingCopy.form.step1.fields.lastName.label}</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={schedulingCopy.form.step1.fields.lastName.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">{schedulingCopy.form.step1.fields.email.label}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={schedulingCopy.form.step1.fields.email.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">{schedulingCopy.form.step1.fields.phone.label}</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={schedulingCopy.form.step1.fields.phone.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="relationship">{schedulingCopy.form.step1.fields.relationship.label}</label>
                                    <select
                                        id="relationship"
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">{schedulingCopy.form.step1.fields.relationship.placeholder}</option>
                                        {relationshipOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Care Recipient Information */}
                        {currentStep === 2 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">{schedulingCopy.form.step2.title}</h2>
                                    <p className="step-subtitle">{schedulingCopy.form.step2.subtitle}</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recipientName">{schedulingCopy.form.step2.fields.recipientName.label}</label>
                                    <input
                                        type="text"
                                        id="recipientName"
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={schedulingCopy.form.step2.fields.recipientName.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="recipientAge">{schedulingCopy.form.step2.fields.recipientAge.label}</label>
                                        <input
                                            type="number"
                                            id="recipientAge"
                                            name="recipientAge"
                                            value={formData.recipientAge}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={schedulingCopy.form.step2.fields.recipientAge.placeholder}
                                            min="1"
                                            max="120"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipientGender">{schedulingCopy.form.step2.fields.recipientGender.label}</label>
                                        <select
                                            id="recipientGender"
                                            name="recipientGender"
                                            value={formData.recipientGender}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        >
                                            <option value="">{schedulingCopy.form.step2.fields.recipientGender.placeholder}</option>
                                            {schedulingCopy.form.options.gender.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recipientConditions">{schedulingCopy.form.step2.fields.recipientConditions.label}</label>
                                    <textarea
                                        id="recipientConditions"
                                        name="recipientConditions"
                                        value={formData.recipientConditions}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder={schedulingCopy.form.step2.fields.recipientConditions.placeholder}
                                        disabled={isSubmitting}
                                    ></textarea>
                                    <small className="form-note">{schedulingCopy.form.step2.fields.recipientConditions.note}</small>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Service Details */}
                        {currentStep === 3 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">{schedulingCopy.form.step3.title}</h2>
                                    <p className="step-subtitle">{schedulingCopy.form.step3.subtitle}</p>
                                </div>

                                <div className="form-group">
                                    <label>{schedulingCopy.form.step3.fields.services.label}</label>
                                    <div className="checkbox-grid">
                                        {servicesList.map((service) => (
                                            <label key={service.id} className="checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    name="services"
                                                    value={service.id}
                                                    checked={formData.services.includes(service.id)}
                                                    onChange={handleInputChange}
                                                    disabled={isSubmitting}
                                                />
                                                <span className="checkbox-label">{service.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="careLevel">{schedulingCopy.form.step3.fields.careLevel.label}</label>
                                        <select
                                            id="careLevel"
                                            name="careLevel"
                                            value={formData.careLevel}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">{schedulingCopy.form.step3.fields.careLevel.placeholder}</option>
                                            {careLevelOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="frequency">{schedulingCopy.form.step3.fields.frequency.label}</label>
                                        <select
                                            id="frequency"
                                            name="frequency"
                                            value={formData.frequency}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">{schedulingCopy.form.step3.fields.frequency.placeholder}</option>
                                            {frequencyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="preferredTime">{schedulingCopy.form.step3.fields.preferredTime.label}</label>
                                        <select
                                            id="preferredTime"
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">{schedulingCopy.form.step3.fields.preferredTime.placeholder}</option>
                                            {timeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="startDate">{schedulingCopy.form.step3.fields.startDate.label}</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urgency">{schedulingCopy.form.step3.fields.urgency.label}</label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">{schedulingCopy.form.step3.fields.urgency.placeholder}</option>
                                        {urgencyOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Location & Review */}
                        {currentStep === 4 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">{schedulingCopy.form.step4.title}</h2>
                                    <p className="step-subtitle">{schedulingCopy.form.step4.subtitle}</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">{schedulingCopy.form.step4.fields.address.label}</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={schedulingCopy.form.step4.fields.address.placeholder}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="city">{schedulingCopy.form.step4.fields.city.label}</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder={schedulingCopy.form.step4.fields.city.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zipCode">{schedulingCopy.form.step4.fields.zipCode.label}</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder={schedulingCopy.form.step4.fields.zipCode.placeholder}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specialRequests">{schedulingCopy.form.step4.fields.specialRequests.label}</label>
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder={schedulingCopy.form.step4.fields.specialRequests.placeholder}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="additionalInfo">{schedulingCopy.form.step4.fields.additionalInfo.label}</label>
                                    <textarea
                                        id="additionalInfo"
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder={schedulingCopy.form.step4.fields.additionalInfo.placeholder}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {/* Form Navigation */}
                        <div className="form-navigation">
                            {currentStep > 1 && (
                                <button 
                                    type="button" 
                                    className="nav-btn prev-btn"
                                    onClick={prevStep}
                                    disabled={isSubmitting}
                                >
                                    {schedulingCopy.form.navigation.previous}
                                </button>
                            )}
                            
                            {currentStep < 4 ? (
                                <button 
                                    type="button" 
                                    className="nav-btn next-btn"
                                    onClick={nextStep}
                                    disabled={isSubmitting}
                                >
                                    {schedulingCopy.form.navigation.next}
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    className={`nav-btn submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? schedulingCopy.form.navigation.submitting : schedulingCopy.form.navigation.submit}
                                </button>
                            )}
                        </div>

                        <div className="form-privacy-note">
                            <p>
                                {schedulingCopy.form.privacyNote}
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Scheduling
