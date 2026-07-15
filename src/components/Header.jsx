'use client'

import './Header.css'
import GooeyBtn from './gooeybtn'
// import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import homeCopy from '../../copy/home.json'

function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { name: homeCopy.header.servicesDropdown.personalCare, href: '/services/personal-care' },
    { name: homeCopy.header.servicesDropdown.companionCare, href: '/services/companion-care' },
    { name: homeCopy.header.servicesDropdown.respiteCare, href: '/services/respite-care' },
    { name: homeCopy.header.servicesDropdown.inFacilityCare, href: '/services/in-facility-care' },
    { name: homeCopy.header.servicesDropdown.specializedCare, href: '/services/specialized-care' },
    { name: homeCopy.header.servicesDropdown.endOfLifeCare, href: '/services/end-of-life-care' }
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
      document.documentElement.style.overflowX = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
      document.documentElement.style.overflowX = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize if moving to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleServiceClick = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <header className="header" data-aos="fade-down">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo" data-aos="fade-right" data-aos-delay="100" onClick={closeMobileMenu}>
          <img src={homeCopy.images.logo} alt={homeCopy.header.logo.alt} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav" data-aos="fade-down" data-aos-delay="200">
          <ul className="nav-list">
            <li><Link href="/about" className="nav-link">{homeCopy.header.navigation.about}</Link></li>
            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link href="/services" className="nav-link dropdown-toggle">
                {homeCopy.header.navigation.services}
                <span className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
              </Link>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {services.map((service, index) => (
                  <Link key={index} href={service.href} className="dropdown-item">
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            <li><Link href="/careers" className="nav-link">{homeCopy.header.navigation.careers}</Link></li>
            <li><Link href="/blogs" className="nav-link">{homeCopy.header.navigation.blog}</Link></li>
            <li><Link href="/locations" className="nav-link">Service Areas</Link></li>
            <li><Link href="/refer-us" className="nav-link">{homeCopy.header.navigation.referUs}</Link></li>
          </ul>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="cta-buttons desktop-cta" data-aos="fade-left" data-aos-delay="300">
          {/* <ThemeToggle /> */}
          <Link href="/contact">
            <GooeyBtn text={homeCopy.header.ctaButtons.contact} variant="white" extendby={84} />
          </Link>
          <Link href="/scheduling">
            <GooeyBtn text={homeCopy.header.ctaButtons.scheduleCare} variant="black" extendby={120} direction="left" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={handleMobileMenuToggle}
          aria-label={homeCopy.header.mobileMenu.toggleAriaLabel}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            <li>
              <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.about}
              </Link>
            </li>
            <li className="mobile-dropdown">
              <button 
                className="mobile-nav-link dropdown-toggle"
                onClick={handleServiceClick}
              >
                {homeCopy.header.navigation.services}
                <span className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
              </button>
              <div className={`mobile-dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    href={service.href} 
                    className="mobile-dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link href="/careers" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.careers}
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.blog}
              </Link>
            </li>
            <li>
              <Link href="/locations" className="mobile-nav-link" onClick={closeMobileMenu}>
                Service Areas
              </Link>
            </li>
            <li>
              <Link href="/refer-us" className="mobile-nav-link" onClick={closeMobileMenu}>
                {homeCopy.header.navigation.referUs}
              </Link>
            </li>
          </ul>

          {/* Mobile CTA Buttons */}
          <div className="mobile-cta-buttons">
            <Link href="/contact" className="mobile-cta-btn primary" onClick={closeMobileMenu}>
              {homeCopy.header.ctaButtons.contactUs}
            </Link>
            <Link href="/scheduling" className="mobile-cta-btn secondary" onClick={closeMobileMenu}>
              {homeCopy.header.ctaButtons.scheduleCare}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  )
}

export default Header
