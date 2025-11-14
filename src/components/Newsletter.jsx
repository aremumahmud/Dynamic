import './Newsletter.css'
import { useState } from 'react'
import emailService from '../services/emailService'
import homeCopy from '../../copy/home.json'

function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitting(true);
            
            try {
                // Send admin notification email
                const result = await emailService.sendNewsletterSubscriptionEmail({ email });
                
                if (result.success) {
                    console.log('Newsletter subscription successful:', email);
                    setIsSubmitted(true);
                    setEmail('');
                    
                    // Reset success message after 5 seconds
                    setTimeout(() => {
                        setIsSubmitted(false);
                    }, 5000);
                } else {
                    console.error('Failed to send newsletter subscription:', result.error);
                    alert('Sorry, there was an error subscribing to our newsletter. Please try again or contact us directly.');
                }
            } catch (error) {
                console.error('Newsletter subscription error:', error);
                alert('Sorry, there was an error subscribing to our newsletter. Please try again or contact us directly.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">
                <div className="newsletter-content" data-aos="fade-up">
                    <div className="newsletter-text">
                        <div className="newsletter-badge">{homeCopy.newsletter.badge}</div>
                        <h2 className="newsletter-title">{homeCopy.newsletter.title}</h2>
                        <p className="newsletter-subtitle">
                            {homeCopy.newsletter.subtitle}
                        </p>
                    </div>

                    <div className="newsletter-form-section" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="form-title">{homeCopy.newsletter.formTitle}</h3>
                        <p className="form-subtitle">
                            {homeCopy.newsletter.formSubtitle}
                        </p>

                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={homeCopy.newsletter.emailPlaceholder}
                                    required
                                    className="newsletter-input1"
                                    disabled={isSubmitting}
                                />
                                <button 
                                    type="submit" 
                                    className={`newsletter-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Subscribing...' : homeCopy.newsletter.subscribeButton}
                                </button>
                            </div>
                        </form>

                        {isSubmitted && (
                            <div className="success-message" data-aos="fade-in">
                                {homeCopy.newsletter.successMessage}
                            </div>
                        )}

                        <p className="privacy-text">
                            {homeCopy.newsletter.privacyText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
