import './Parallax.css'
import { useEffect, useRef, useState } from 'react'
import SplitText from './SplitText'
import homeCopy from '../../copy/home.json'

function Parallax() {
    const [isVisible, setIsVisible] = useState(false);
    const spacerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50% 0px'
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
            <div ref={spacerRef} className="parallax-spacer"></div>
            <section className={`parallax-section ${isVisible ? 'visible' : ''}`}>
                <div className="parallax-content">
                    <SplitText 
                        text={homeCopy.parallax.text}
                        className="parallax-text"
                        tag="h1"
                        delay={80}
                        duration={1.2}
                        from={{ opacity: 0, y: 60, rotateX: -45, scale: 0.8 }}
                        to={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        trigger={isVisible}
                    />
                </div>
            </section>
        </>
    )
}

export default Parallax
