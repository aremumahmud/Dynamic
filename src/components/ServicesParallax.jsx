import './ServicesParallax.css'
import { useState, useEffect, useRef } from 'react'
import SplitText from './SplitText'

function ServicesParallax() {
    const [isVisible, setIsVisible] = useState(false);
    const spacerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '-200px 0px -100px 0px'
            }
        );

        if (spacerRef.current) {
            observer.observe(spacerRef.current);
        }

        return () => {
            if (spacerRef.current) {
                observer.unobserve(spacerRef.current);
            }
        };
    }, []);

    return (
        <>
            <div ref={spacerRef} className="services-parallax-spacer"></div>
            <div className={`services-parallax-section ${isVisible ? 'visible' : ''}`}>
                <div className="services-parallax-content">
                    <SplitText 
                        text="Your Care Journey Starts Here"
                        className="services-parallax-text"
                        trigger={isVisible}
                    />
                </div>
            </div>
        </>
    )
}

export default ServicesParallax
