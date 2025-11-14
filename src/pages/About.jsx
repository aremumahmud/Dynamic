import './About.css'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Parallax from '../components/Parallax'
import aboutCopy from '../../copy/about.json'

function About() {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const values = aboutCopy.values.valuesList;



    const stats = aboutCopy.hero.stats;

    return (
        <div className="about-page">
            <Header />
            
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-container">
                    <div className="about-hero-content">
                        <div className="about-hero-text" data-aos="fade-up">
                            <div className="about-badge">{aboutCopy.hero.badge}</div>
                            <h1 className="about-hero-title">
                                {aboutCopy.hero.title}<br />
                                <span className="highlight1">{aboutCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="about-hero-description">
                                {aboutCopy.hero.description}
                            </p>
                            <div className="about-stats" data-aos="fade-up" data-aos-delay="200">
                                {stats.map((stat, index) => (
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

            {/* Mission Section */}
            <section className="mission-section">
                <div className="mission-container">
                    <div className="mission-content" data-aos="fade-up">
                        <div className="mission-header">
                            <h2 className="mission-title">{aboutCopy.mission.title}</h2>
                            <div className="mission-divider"></div>
                        </div>
                        <div className="mission-text">
                            <p className="mission-statement">
                                {aboutCopy.mission.statement}
                            </p>
                            <p className="mission-values">
                                {aboutCopy.mission.values}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="story-container">
                    <div className="story-content">
                        <div className="story-text" data-aos="fade-right">
                            <h2 className="story-title">{aboutCopy.story.title}</h2>
                            {aboutCopy.story.paragraphs.map((paragraph, index) => (
                                <p key={index} className="story-description">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="story-image" data-aos="fade-left" data-aos-delay="200">
                            <img src={aboutCopy.images.hero.gallery[1]} alt="Our Story" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="values-container">
                    <div className="values-header" data-aos="fade-up">
                        <h2 className="values-title">{aboutCopy.values.title}</h2>
                        <p className="values-subtitle">
                            {aboutCopy.values.subtitle}
                        </p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parallax Section */}
            <Parallax />

            {/* Commitment Section */}
            <section className="commitment-section">
                <div className="commitment-container">
                    <div className="commitment-content">
                        <div className="commitment-image" data-aos="fade-right">
                            <img src={aboutCopy.images.hero.gallery[2]} alt="Our Commitment" />
                        </div>
                        <div className="commitment-text" data-aos="fade-left" data-aos-delay="200">
                            <h2 className="commitment-title">{aboutCopy.commitment.title}</h2>
                            <div className="commitment-points">
                                {aboutCopy.commitment.points.map((point, index) => (
                                    <div key={index} className="commitment-point">
                                        <span className="point-icon">✓</span>
                                        <div className="point-content">
                                            <h4>{point.title}</h4>
                                            <p>{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta-section">
                <div className="about-cta-container">
                    <div className="about-cta-content" data-aos="fade-up">
                        <h2 className="cta-title">{aboutCopy.cta.title}</h2>
                        <p className="cta-description">
                            {aboutCopy.cta.description}
                        </p>
                        <div className="cta-buttons">
                            <a href="/scheduling" className="cta-btn primary">
                                {aboutCopy.cta.buttons.primary}
                            </a>
                            <a href="/contact" className="cta-btn secondary">
                                {aboutCopy.cta.buttons.secondary}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default About
