import './Testimonials.css'
import { useState, useEffect } from 'react'
import homeCopy from '../../copy/home.json'

function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    const testimonials = homeCopy.testimonials.testimonials.map((testimonial, index) => ({
        id: index + 1,
        feedback: testimonial.feedback,
        name: testimonial.name,
        location: testimonial.location,
        image: homeCopy.images.testimonials.profileImages[index]
    }));

    const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

    // Handle responsive items per slide
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setItemsPerSlide(1); // Mobile: 1 testimonial
            } else if (width <= 1024) {
                setItemsPerSlide(2); // Tablet: 2 testimonials
            } else {
                setItemsPerSlide(3); // Desktop: 3 testimonials
            }
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset current slide when itemsPerSlide changes
    useEffect(() => {
        setCurrentSlide(0);
    }, [itemsPerSlide]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    const getCurrentTestimonials = () => {
        const start = currentSlide * itemsPerSlide;
        const end = start + itemsPerSlide;
        return testimonials.slice(start, end);
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header" data-aos="fade-up">
                    <div className="testimonials-badge">{homeCopy.testimonials.badge}</div>
                    <h2 className="testimonials-title">{homeCopy.testimonials.title}</h2>
                    <p className="testimonials-subtitle">
                        {homeCopy.testimonials.subtitle}
                    </p>
                </div>

                <div className="carousel-container" data-aos="fade-up" data-aos-delay="200">
                    <div className="carousel-wrapper">
                        <button className="carousel-nav prev" onClick={prevSlide} aria-label={homeCopy.testimonials.carouselControls.previousAriaLabel}>
                            ←
                        </button>
                        
                        <div className="testimonials-carousel">
                            <div 
                                className="testimonials-track"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="testimonials-slide">
                                        {testimonials.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((testimonial, index) => (
                                            <div key={testimonial.id} className="testimonial-card">
                                                <div className="testimonial-header">
                                                    <span className="testimonial-label">{homeCopy.testimonials.clientFeedbackLabel}</span>
                                                    <div className="quote-icon">"</div>
                                                </div>
                                                
                                                <div className="testimonial-content">
                                                    <p className="testimonial-text">
                                                        {testimonial.feedback}
                                                    </p>
                                                </div>
                                                
                                                <div className="testimonial-footer">
                                                    <div className="client-profile">
                                                        <img 
                                                            src={testimonial.image} 
                                                            alt={testimonial.name}
                                                            className="client-avatar"
                                                        />
                                                        <div className="client-info">
                                                            <h4 className="client-name">{testimonial.name}</h4>
                                                            <p className="client-location">{testimonial.location}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <button className="carousel-nav next" onClick={nextSlide} aria-label={homeCopy.testimonials.carouselControls.nextAriaLabel}>
                            →
                        </button>
                    </div>
                    
                    <div className="carousel-indicators">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`${homeCopy.testimonials.carouselControls.goToSlideAriaLabel} ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
