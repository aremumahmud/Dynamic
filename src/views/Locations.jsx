'use client'

import './Locations.css'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { locationsList, county } from '../data/locationsData'

function Locations() {
  return (
    <div className="locations-page">
      <Header />

      <Breadcrumbs items={[{ name: 'Service Areas', path: '/locations' }]} />

      <section className="locations-hero">
        <h1 className="locations-hero-title">Home Care Services Across {county}, TX</h1>
        <p className="locations-hero-description">
          Dynamic Care Services proudly provides compassionate personal care, companion care,
          respite care, specialized care, and end-of-life care to families throughout {county}
          and the surrounding Dallas-Fort Worth area. Choose your city below to learn more about
          home care in your community.
        </p>
      </section>

      <section className="locations-grid-section">
        <h2>Our {county} Service Areas</h2>
        <div className="locations-grid">
          {locationsList.map((location) => (
            <Link key={location.slug} href={`/locations/${location.slug}`} className="location-card">
              <div className="location-card-name">{location.name}, TX</div>
              <div className="location-card-meta">Home Care Services</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="location-cta">
        <Link href="/scheduling" className="location-cta-button">Schedule a Free Consultation</Link>
      </section>

      <Footer />
    </div>
  )
}

export default Locations
