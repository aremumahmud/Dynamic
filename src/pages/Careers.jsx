import './Careers.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import careersCopy from '../../copy/careers.json'

function Careers() {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleApplyClick = (position) => {
        const subject = encodeURIComponent(`Application for ${position}`);
        const body = encodeURIComponent(`Dear Dynamic Care Services Team,

I am interested in applying for the ${position} position. Please find my resume attached and let me know if you need any additional information.

Best regards,
[Your Name]`);
        
        window.location.href = `mailto:dynamiccare565@gmail.com?subject=${subject}&body=${body}`;
    };

    const jobListings = careersCopy.jobListings.jobs.map((job, index) => ({
        ...job,
        image: careersCopy.images.jobImages[job.slug] || careersCopy.images.jobImages['home-care-assistant-full-time']
    }));



    return (
        <div className="careers-page">
            <Header />
            
            {/* Hero Section */}
            <section className="careers-hero">
                <div className="careers-hero-container">
                    <div className="careers-hero-content">
                        <div className="careers-hero-text" data-aos="fade-up">
                            <div className="careers-badge">{careersCopy.hero.badge}</div>
                            <h1 className="careers-hero-title">
                                {careersCopy.hero.title}<br />
                                <span className="highlight1">{careersCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="careers-hero-description">
                                {careersCopy.hero.description}
                            </p>
                            <div className="careers-stats" data-aos="fade-up" data-aos-delay="200">
                                {careersCopy.hero.stats.map((stat, index) => (
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

            {/* Job Listings Section */}
            <section className="job-listings-section">
                <div className="job-listings-container">
                    <div className="job-listings-header" >
                        <h2 className="listings-title">{careersCopy.jobListings.title}</h2>
                        <p className="listings-subtitle">
                            {careersCopy.jobListings.subtitle}
                        </p>
                    </div>

                    <div className="job-cards-grid">
                        {jobListings.map((job, index) => (
                            <div key={job.id} className="job-card" data-aos="fade-up" data-aos-delay={index * 200}>
                                <div className="job-card-image">
                                    <img src={job.image} alt={job.title} />
                                    <div className="job-card-overlay">
                                        <span className="job-status">{job.posted}</span>
                                    </div>
                                </div>
                                
                                <div className="job-card-content">
                                    <div className="job-card-header">
                                        <h3 className="job-card-title">{job.title}</h3>
                                        <div className="job-card-meta">
                                            <span className="job-type">{job.type}</span>
                                            <span className="job-salary">{job.salary}</span>
                                        </div>
                                        <div className="job-card-location">
                                            <span className="location-icon">📍</span>
                                            <span>{job.location}</span>
                                        </div>
                                    </div>

                                    <p className="job-card-description">{job.description}</p>

                                    <div className="job-card-actions">
                                        <Link 
                                            to={`/careers/${job.slug}`}
                                            className="view-details-btn"
                                        >
                                            {careersCopy.jobListings.buttons.viewDetails}
                                            <span className="">→</span>
                                        </Link>
                                        <button 
                                            className="apply-btn"
                                            onClick={() => handleApplyClick(job.title)}
                                        >
                                            {careersCopy.jobListings.buttons.applyNow}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Careers
