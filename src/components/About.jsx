import './About.css'
import homeCopy from '../../copy/home.json'

function About() {
    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <div className="about-badge" data-aos="fade-up" data-aos-delay="100">
                            {homeCopy.about.badge}
                        </div>
                        
                        <h2 className="about-title" data-aos="fade-up" data-aos-delay="200">
                            {homeCopy.about.title} <span className="title-highlight">{homeCopy.about.titleHighlight}</span>
                        </h2>
                        
                        <div className="about-description" data-aos="fade-up" data-aos-delay="300">
                            <p>
                                {homeCopy.about.description}
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-image" data-aos="fade-left" data-aos-delay="300">
                        <img src={homeCopy.images.about.main} alt="Compassionate caregiving" />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <div className="overlay-stat">
                                    <span className="overlay-number">{homeCopy.about.imageOverlay.yearsExperience}</span>
                                    <span className="overlay-label">{homeCopy.about.imageOverlay.yearsLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
