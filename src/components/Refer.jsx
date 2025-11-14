import './Refer.css'
import { Link } from 'react-router-dom'
import homeCopy from '../../copy/home.json'

function Refer() {
    const referralReasons = homeCopy.refer.reasons.map((reason, index) => ({
        id: index + 1,
        title: reason.title,
        description: reason.description
    }));

    return (
        <section className="refer-section">
            <div className="refer-container">
                <div className="refer-content">
                    <div className="refer-text">
                        <div className="refer-badge" data-aos="fade-up" data-aos-delay="100">
                            {homeCopy.refer.badge}
                        </div>
                        
                        <h2 className="refer-title" data-aos="fade-up" data-aos-delay="200">
                            {homeCopy.refer.title} <span className="title-highlight">{homeCopy.refer.titleHighlight}</span>
                        </h2>
                        
                        <div className="refer-description" data-aos="fade-up" data-aos-delay="300">
                            <p>
                                {homeCopy.refer.description}
                            </p>
                        </div>

                        <div className="refer-reasons" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="reasons-title">{homeCopy.refer.reasonsTitle}</h3>
                            <div className="reasons-list">
                                {referralReasons.map((reason, index) => (
                                    <div key={reason.id} className="reason-item" data-aos="fade-up" data-aos-delay={`${500 + (index * 100)}`}>
                                        <div className="reason-icon">✓</div>
                                        <div className="reason-content">
                                            <h4 className="reason-title">{reason.title}</h4>
                                            <p className="reason-description">{reason.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="refer-cta" data-aos="fade-up" data-aos-delay="800">
                            <Link to="/refer-us" className="refer-button">
                                {homeCopy.refer.ctaButton}
                            </Link>
                        </div>
                    </div>
                    
                    <div className="refer-image" data-aos="fade-left" data-aos-delay="300">
                        <img src={homeCopy.images.refer.main} alt="Caregiver helping senior" />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <div className="overlay-text">
                                    <span className="overlay-main">{homeCopy.refer.imageOverlay.mainText}</span>
                                    <span className="overlay-sub">{homeCopy.refer.imageOverlay.subText}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Refer
