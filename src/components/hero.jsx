import { useState, useEffect } from 'react'
import GooeyBtn from './gooeybtn'
import './hero.css'
import { BsArrowUpRight, BsArrowUpLeft } from 'react-icons/bs'
// import GradientBlinds from '../../backgrounds/GradientBlinds/GradientBlinds'
import homeCopy from '../../copy/home.json'

function Hero() {
    // Array of all images from JSON
    const images = homeCopy.images.hero.rotatingImages;

    // Array of text content for each image
    const textContent = homeCopy.hero.rotatingContent;

    // State to track current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Effect to cycle through images every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % images.length
                );
                setIsTransitioning(false);
            }, 600); // Half of transition duration
        }, 6000); // 6 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="left-content" data-aos="fade-right" data-aos-delay="100">

                    <div className="badge1" data-aos="zoom-in" data-aos-delay="200">{homeCopy.hero.badge}</div>
                    <div className="hero-heading" data-aos="fade-up" data-aos-delay="300">
                        <h1>{homeCopy.hero.mainHeading}</h1>
                        <p>{homeCopy.hero.mainDescription} <br />
                        </p>
                    </div>
                    <div className="team" data-aos="fade-up" data-aos-delay="400">
                        <div className="avatar-stack">
                            <div className="avatar-image one"></div>
                            <div className="avatar-image two"></div>
                            <div className="avatar-image three"></div>

                        </div>
                        <p>{homeCopy.hero.teamStats}</p>
                    </div>

                    <div className="cta-buttons" data-aos="fade-up" data-aos-delay="500">
                        <GooeyBtn extendby={220} direction="left" text={homeCopy.hero.ctaButton} />

                    </div>

                </div>
                <div className="right-content" data-aos="fade-left" data-aos-delay="200">
                    <img
                        src={images[currentImageIndex]}
                        alt=""
                        className={`hero-image ${isTransitioning ? 'transitioning-out' : 'transitioning-in'}`} 
                        style={{
                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning
                                ? 'scale(1.1) translateY(-10px) rotateX(5deg)'
                                : 'scale(1) translateY(0) rotateX(0deg)',
                            filter: isTransitioning ? 'blur(2px)' : 'blur(0px)'
                        }}
                    />

                    <div className="whole_page">
                        <div className="top">
                            <div className="group">
                                <div data-aos="fade-up" data-aos-delay="600" className="blur_badge">{homeCopy.hero.imageOverlay.badges.personalCare}</div>
                                <div data-aos="fade-up" data-aos-delay="700" className="blur_badge">{homeCopy.hero.imageOverlay.badges.homeHealthCare}</div>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="800" className="blur_badge">{homeCopy.hero.imageOverlay.badges.houstonTX}</div>

                        </div>
                        <div className="bottom">

                            <div data-aos="fade-up" data-aos-delay="900" className="blur_arrow">
                                <BsArrowUpRight color='white' />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="1000" className="info">
                                <p
                                    className="heading"
                                    style={{
                                        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        opacity: isTransitioning ? 0 : 1,
                                        transform: isTransitioning
                                            ? 'translateX(-30px) translateY(-10px)'
                                            : 'translateX(0) translateY(0)',
                                        filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                    }}
                                >
                                    {textContent[currentImageIndex].heading}
                                </p>
                                <p
                                    className="para pmain"
                                    style={{
                                        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transitionDelay: '0.1s',
                                        opacity: isTransitioning ? 0 : 1,
                                        transform: isTransitioning
                                            ? 'translateX(-20px) translateY(-5px)'
                                            : 'translateX(0) translateY(0)',
                                        filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                    }}
                                >
                                    {textContent[currentImageIndex].description}
                                </p>
                            </div>
                        </div>
                    </div>

                  
                    <div className="decoration_wrapper" >
                        <img className="decor_top" src={homeCopy.images.hero.decor} alt="" />
                        <img className="decor_bottom" src={homeCopy.images.hero.decor} alt="" />

                        <div className="decor_content">
                            <div className="decor_content_inner">
                                <div className="arrow-icon">
                                    <BsArrowUpRight color='white' />
                                    <img className="decor_bottom1" src={homeCopy.images.hero.decor} alt="" />
                                </div>

                                <div className="vertical"></div>
                                <div className="horizontal"></div>
                                <div className="whole">
                                    <p
                                        data-aos="fade-up"
                                        data-aos-delay="600"
                                        className='heading'
                                        style={{
                                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            opacity: isTransitioning ? 0 : 1,
                                            transform: isTransitioning
                                                ? 'translateY(-20px) scale(0.95)'
                                                : 'translateY(0) scale(1)',
                                            filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                        }}
                                    >
                                        {textContent[currentImageIndex].popularHeading}
                                    </p>
                                    <p
                                        data-aos="fade-up"
                                        data-aos-delay="700"
                                        className='para'
                                        style={{
                                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: '0.15s',
                                            opacity: isTransitioning ? 0 : 1,
                                            transform: isTransitioning
                                                ? 'translateY(-15px) scale(0.95)'
                                                : 'translateY(0) scale(1)',
                                            filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                        }}
                                    >
                                        {textContent[currentImageIndex].popularDescription}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero