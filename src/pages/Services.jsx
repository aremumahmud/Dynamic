import './Services.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { servicesData, servicesList } from '../data/servicesData'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ServicesParallax from '../components/ServicesParallax'
import ServicesFAQ from '../components/ServicesFAQ'
import servicesCopy from '../../copy/services.json'

function Services() {
    const { serviceId } = useParams();
    const [activeService, setActiveService] = useState(serviceId || 'companion-care');

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (serviceId && servicesData[serviceId]) {
            setActiveService(serviceId);
        }
    }, [serviceId]);
    
    const serviceImages = servicesCopy.images.serviceImages;

    const currentService = servicesData[activeService];

    return (
        <div className="services-page">
            <Header />
            
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-container">
                    <div className="services-hero-content">
                        <div className="services-hero-text" data-aos="fade-up">
                            <div className="services-badge">{servicesCopy.hero.badge}</div>
                            <h1 className="services-hero-title">
                                {servicesCopy.hero.title}<br />
                                <span className="highlight">{servicesCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="services-hero-description">
                                {servicesCopy.hero.description}
                            </p>
                            <div className="services-stats" data-aos="fade-up" data-aos-delay="200">
                                {servicesCopy.hero.stats.map((stat, index) => (
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

            {/* Service Tabs */}
            <section className="services-tabs-section">
                <div className="services-tabs-container">
                    <div className="services-tabs" data-aos="fade-up">
                        {servicesList.map((service) => (
                            <button
                                key={service.id}
                                className={`service-tab ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => setActiveService(service.id)}
                            >
                                {service.shortName}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="service-details">
                <div className="service-details-container">
                    <div className="service-content" data-aos="fade-up">
                        <div className="service-header">
                            <div className="service-image" data-aos="fade-up" data-aos-delay="100">
                                <img src={serviceImages[activeService]} alt={currentService.title} />
                            </div>
                            <h2 className="service-title">{currentService.title}</h2>
                            <p className="service-subtitle">{currentService.subtitle}</p>
                            <p className="service-description">{currentService.description}</p>
                        </div>

                        <div className="service-features">
                            <div className="feature-section" data-aos="fade-up" data-aos-delay="200">
                                <h3 className="feature-title">{servicesCopy.serviceDetails.whatWeProvide}</h3>
                                <ul className="feature-list">
                                    {currentService.whatWeProvide.map((item, index) => (
                                        <li key={index} className="feature-item">
                                            <span className="feature-icon">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="feature-section" data-aos="fade-up" data-aos-delay="400">
                                <h3 className="feature-title">{servicesCopy.serviceDetails.keyBenefits}</h3>
                                <ul className="feature-list">
                                    {currentService.keyBenefits.map((benefit, index) => (
                                        <li key={index} className="feature-item">
                                            <span className="feature-icon">★</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="service-cta1" data-aos="fade-up" data-aos-delay="600">
                            <h3 className="cta-title">{servicesCopy.serviceDetails.ctaTitle}</h3>
                            <p className="cta-description">{servicesCopy.serviceDetails.ctaDescription}</p>
                            <Link to="/scheduling" className="cta-button">{servicesCopy.serviceDetails.ctaButton}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Section */}
            <ServicesParallax />

            {/* Contact Section */}
            <section className="contact-section1">
                <div className="contact-container">
                    <div className="contact-content" data-aos="fade-up">
                        <h2 className="contact-title1">
                            {servicesCopy.contact.title}
                        </h2>
                        <div className="contact-info-grid">
                            {servicesCopy.contact.contactInfo.map((item, index) => (
                                <div key={index} className="contact-info-item" data-aos="fade-up" data-aos-delay={200 + (index * 200)}>
                                    <div className="contact-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    {item.title === "Call Us" || item.title === "Email Us" ? (
                                        <a href={item.title === "Call Us" ? "tel:+19729998499" : "mailto:dynamiccare565@gmail.com"} className="contact-link">{item.details}</a>
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

            {/* Services FAQ */}
            <ServicesFAQ />

            <Footer />
        </div>
    )
}

export default Services
