'use client'

import './JobDetail.css'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { jobListings } from '../data/careersData'

function JobDetail() {
    const { jobId } = useParams();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleApplyClick = (position) => {
        // Get the job type from the current job
        const job = jobListings[jobId];
        const jobType = job ? job.type : 'Home Care Assistant';
        
        const subject = encodeURIComponent(`Application for ${position} - ${jobType} Position`);
        const body = encodeURIComponent(`Dear Dynamic Care Services Team,

I am writing to express my interest in the ${position} position (${jobType}) at Dynamic Care Services.

POSITION DETAILS:
- Position: ${position}
- Schedule: ${jobType}
- Location: Dallas-Fort Worth and surrounding areas
- Pay: Competitive compensation based on experience

MY QUALIFICATIONS:
- High school diploma or equivalent: [Yes/No]
- Previous caregiving experience: [Please describe your experience]
- CPR certification: [Yes/No - if no, are you willing to obtain?]
- Valid driver's license: [Yes/No]
- Reliable transportation: [Yes/No]
- Available for background check and drug screening: [Yes/No]

WHY I'M INTERESTED:
[Please explain why you want to work as a Personal Care Assistant and what makes you a good fit for this role]

AVAILABILITY:
- Preferred work schedule: [Please specify your availability]
- Start date: [When are you available to start?]
- Any scheduling restrictions: [Please note any days/times you cannot work]

I have attached my resume and references. I am excited about the opportunity to make a meaningful difference in the lives of clients while building a rewarding career in personal care.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
[Your Full Name]
[Your Phone Number]
[Your Email Address]`);
        
        window.location.href = `mailto:dynamiccare565@gmail.com?subject=${subject}&body=${body}`;
    };

    const job = jobListings[jobId];

    if (!job) {
        return (
            <div className="job-detail-page">
                <Header />
                <div className="job-not-found">
                    <div className="job-not-found-container">
                        <h1>Job Not Found</h1>
                        <p>The job you're looking for doesn't exist or has been removed.</p>
                        <Link href="/careers" className="back-to-careers-btn">
                            ← Back to Careers
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="job-detail-page">
            <Header />

            <Breadcrumbs items={[
                { name: 'Careers', path: '/careers' },
                { name: job.title, path: `/careers/${jobId}` },
            ]} />

            {/* Job Detail Hero */}
            <section className="job-detail-hero">
                <div className="job-detail-hero-container">
                    <div className="job-detail-breadcrumb">
                        <Link href="/careers" className="breadcrumb-link">← Back to Careers</Link>
                    </div>
                    
                    <div className="job-detail-hero-content">
                        <div className="job-detail-image" data-aos="fade-right">
                            <img src={job.image} alt={job.title} />
                            <div className="job-detail-overlay">
                                <span className="job-status">{job.posted}</span>
                            </div>
                        </div>
                        
                        <div className="job-detail-info" data-aos="fade-left" data-aos-delay="200">
                            <div className="job-detail-meta">
                                <span className="job-type">{job.type}</span>
                                <span className="job-salary">{job.salary}</span>
                            </div>
                            <h1 className="job-detail-title">{job.title}</h1>
                            <div className="job-detail-location">
                                <span className="location-icon">📍</span>
                                <span>{job.location}</span>
                            </div>
                            <p className="job-detail-description">{job.description}</p>
                            
                            <div className="job-detail-actions">
                                <button 
                                    className="apply-btn-large"
                                    onClick={() => handleApplyClick(job.title)}
                                >
                                    Apply for This Position
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Details Content */}
            <section className="job-details-content-section">
                <div className="job-details-content-container">
                    <div className="job-details-grid">
                        <div className="job-section" data-aos="fade-up">
                            <h2 className="job-section-title">Key Responsibilities</h2>
                            <ul className="job-list">
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">✓</span>
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="job-section" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="job-section-title">Requirements</h2>
                            <ul className="job-list">
                                {job.requirements.map((requirement, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">•</span>
                                        {requirement}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="job-section benefits-section" data-aos="fade-up" data-aos-delay="400">
                            <h2 className="job-section-title">Benefits & Perks</h2>
                            <ul className="job-list benefits-list">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">★</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Section */}
            <section className="job-apply-section">
                <div className="job-apply-container">
                    <div className="job-apply-content" data-aos="fade-up">
                        <h2 className="apply-section-title">Ready to Join Our Team?</h2>
                        <p className="apply-section-description">
                            Take the next step in your healthcare career. Apply for the {job.title} position today 
                            and become part of our compassionate care team.
                        </p>
                        <button 
                            className="apply-btn-large"
                            onClick={() => handleApplyClick(job.title)}
                        >
                            Apply for {job.title}
                        </button>
                        <p className="apply-note">
                            Questions about this position? Contact us at{' '}
                            <a href="mailto:dynamiccare565@gmail.com" className="email-link">
                                dynamiccare565@gmail.com
                            </a>{' '}
                            or call{' '}
                            <a href="tel:+19729998499" className="phone-link">
                                972-999-8499
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default JobDetail
