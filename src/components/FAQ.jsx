import './FAQ.css'
import { useState } from 'react'
import homeCopy from '../../copy/home.json'

function FAQ() {
    const [openItem, setOpenItem] = useState(null);

    const faqs = homeCopy.faq.questions.map((faq, index) => ({
        id: index + 1,
        question: faq.question,
        answer: faq.answer
    }));

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <div className="faq-header" data-aos="fade-up">
                    <div className="faq-badge">{homeCopy.faq.badge}</div>
                    <h2 className="faq-title">{homeCopy.faq.title}</h2>
                    <p className="faq-subtitle">
                        {homeCopy.faq.subtitle}
                    </p>
                </div>

                <div className="faq-list" data-aos="fade-up" data-aos-delay="200">
                    {faqs.map((faq, index) => (
                        <div 
                            key={faq.id} 
                            className={`faq-item ${openItem === faq.id ? 'open' : ''}`}
                            // data-aos="fade-up" 
                            // data-aos-delay={`${300 + (index * 50)}`}
                        >
                            <button 
                                className="faq-question"
                                onClick={() => toggleItem(faq.id)}
                                aria-expanded={openItem === faq.id}
                            >
                                <span className="question-text">{faq.question}</span>
                                <span className="faq-icon">
                                    {openItem === faq.id ? '−' : '+'}
                                </span>
                            </button>
                            <div className="faq-answer">
                                <div className="answer-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-footer" data-aos="fade-up" data-aos-delay="800">
                    <div className="faq-cta">
                        <h3>{homeCopy.faq.ctaSection.title}</h3>
                        <p>{homeCopy.faq.ctaSection.description}</p>
                        <button className="faq-contact-btn">
                            {homeCopy.faq.ctaSection.button}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
