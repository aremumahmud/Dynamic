import './Statistics.css'
import { useState, useEffect } from 'react'
import homeCopy from '../../copy/home.json'

function Statistics() {
    const [counters, setCounters] = useState({
        families: 0,
        caregivers: 0,
        cities: 0,
        satisfaction: 0
    });

    const [isVisible, setIsVisible] = useState(false);

    const finalValues = {
        families: homeCopy.statistics.familiesServed.number,
        caregivers: homeCopy.statistics.certifiedCaregivers.number,
        cities: homeCopy.statistics.citiesCovered.number,
        satisfaction: homeCopy.statistics.satisfactionRate.number
    };

    // Intersection Observer to trigger animation when component is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        const element = document.getElementById('statistics-marquee');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    // Animate counters when visible
    useEffect(() => {
        if (!isVisible) return;

        const animateCounter = (key, finalValue, duration = 1500) => {
            const startTime = Date.now();
            const startValue = 0;

            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (finalValue - startValue) * easeOut);

                setCounters(prev => ({
                    ...prev,
                    [key]: currentValue
                }));

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        };

        // Stagger the animations slightly
        animateCounter('families', finalValues.families, 1500);
        setTimeout(() => animateCounter('caregivers', finalValues.caregivers, 1400), 100);
        setTimeout(() => animateCounter('cities', finalValues.cities, 1300), 200);
        setTimeout(() => animateCounter('satisfaction', finalValues.satisfaction, 1200), 300);
    }, [isVisible]);

    return (
        <div id="statistics-marquee" className="stats-marquee">
            <div className="stats-container">
                <div className="stat-item">
                    <span data-aos="fade-up" className="stat-number1">{counters.families.toLocaleString()}+</span>
                    <span data-aos="fade-up" className="stat-label">{homeCopy.statistics.familiesServed.label}</span>
                </div>
                
                <div className="stat-divider"></div>
                
                <div className="stat-item">
                    <span data-aos="fade-up" className="stat-number1">{counters.caregivers}+</span>
                    <span data-aos="fade-up" className="stat-label">{homeCopy.statistics.certifiedCaregivers.label}</span>
                </div>
                
                <div className="stat-divider"></div>
                
                <div className="stat-item">
                    <span data-aos="fade-up" className="stat-number1">{counters.cities}+</span>
                    <span data-aos="fade-up" className="stat-label">{homeCopy.statistics.citiesCovered.label}</span>
                </div>
                
                <div data-aos="fade-up" className="stat-divider"></div>
                
                <div className="stat-item">
                    <span data-aos="fade-up" className="stat-number1">{counters.satisfaction}%</span>
                    <span data-aos="fade-up" className="stat-label">{homeCopy.statistics.satisfactionRate.label}</span>
                </div>
            </div>
        </div>
    )
}

export default Statistics
