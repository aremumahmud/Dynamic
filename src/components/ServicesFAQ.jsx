import './ServicesFAQ.css'
import { useState } from 'react'

function ServicesFAQ() {
    const [openItem, setOpenItem] = useState(null);

    const servicesFaqs = [
        {
            id: 1,
            question: "How do you determine which service is right for my loved one?",
            answer: "We start with a comprehensive assessment that evaluates your loved one's physical, emotional, and social needs. Our care coordinators will discuss daily routines, health conditions, and personal preferences to recommend the most appropriate service mix."
        },
        {
            id: 2,
            question: "Can we combine multiple services for comprehensive care?",
            answer: "Absolutely! Many families benefit from combining services. For example, we might provide personal care in the morning, companion care during the day, and respite care on weekends. We'll create a customized plan that addresses all needs."
        },
        {
            id: 3,
            question: "Are your caregivers trained for specialized conditions?",
            answer: "Yes, our caregivers receive specialized training based on the services they provide. This includes training for dementia care, autism support, post-surgical care, and other specific conditions to ensure expert, compassionate care."
        },
        {
            id: 4,
            question: "How quickly can services begin after assessment?",
            answer: "In most cases, we can begin services within 24-48 hours of completing the assessment and care plan. For urgent situations, we offer expedited scheduling and can often start care the same day."
        },
        {
            id: 5,
            question: "What if our care needs change over time?",
            answer: "Care needs often evolve, and we're prepared for that. We regularly review and adjust care plans, can increase or decrease service hours, and seamlessly transition between different types of care as needs change."
        },
        {
            id: 6,
            question: "Do you accept insurance or Medicare for services?",
            answer: "We work with various insurance providers and can help determine coverage options. While Medicare typically doesn't cover custodial care, many long-term care insurance policies do. We'll help you navigate payment options during your consultation."
        }
    ];

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="services-faq-section">
            <div className="services-faq-container">
                <div className="services-faq-header" data-aos="fade-up">
                    <div className="services-faq-badge">Services FAQ</div>
                    <h2 className="services-faq-title">Common Questions About Our Services</h2>
                    <p className="services-faq-subtitle">
                        Get answers to frequently asked questions about our care services and how we can help your family.
                    </p>
                </div>

                <div className="services-faq-list" data-aos="fade-up" data-aos-delay="200">
                    {servicesFaqs.map((faq, index) => (
                        <div 
                            key={faq.id} 
                            className={`services-faq-item ${openItem === faq.id ? 'open' : ''}`}
                            // data-aos="fade-up" 
                            // data-aos-delay={`${300 + (index * 50)}`}
                        >
                            <button 
                                className="services-faq-question"
                                onClick={() => toggleItem(faq.id)}
                                aria-expanded={openItem === faq.id}
                            >
                                <span className="services-question-text">{faq.question}</span>
                                <span className="services-faq-icon">
                                    {openItem === faq.id ? '−' : '+'}
                                </span>
                            </button>
                            <div className="services-faq-answer">
                                <div className="services-answer-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="services-faq-footer" data-aos="fade-up" data-aos-delay="800">
                    <div className="services-faq-cta">
                        <h3>Need More Information About Our Services?</h3>
                        <p>Our care specialists are here to answer your questions and help you choose the right services.</p>
                        <button className="services-faq-contact-btn">
                            Speak with a Care Specialist
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesFAQ
