'use client'

import './Locations.css'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { locationsList, county } from '../data/locationsData'
import { servicesList } from '../data/servicesData'
import { localBusinessSchemaForCity, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL } from '../lib/schema'

function LocationDetail({ location }) {
  const otherLocations = locationsList.filter((item) => item.slug !== location.slug).slice(0, 8)
  const mapQuery = encodeURIComponent(`${location.name}, TX`)

  return (
    <div className="locations-page">
      <Header />

      <JsonLd data={localBusinessSchemaForCity(location.name)} />

      <Breadcrumbs
        items={[
          { name: 'Service Areas', path: '/locations' },
          { name: location.name, path: `/locations/${location.slug}` },
        ]}
      />

      <section className="location-detail-hero">
        <div className="location-detail-badge">{county}, TX</div>
        <h1 className="location-detail-title">Home Care Services in {location.name}, TX</h1>
        <p className="location-detail-description">
          Dynamic Care Services provides compassionate, professional in-home care to seniors and
          individuals with disabilities in {location.name} and throughout {county}. Our caregivers
          bring personal care, companionship, respite support, and specialized care directly to
          your loved one&apos;s home.
        </p>
      </section>

      <section className="location-content-section">
        <h2>Trusted Home Care for {location.name} Families</h2>
        <p>
          Families in {location.name}, Texas trust Dynamic Care Services for reliable, compassionate
          home care that helps their loved ones stay safe and independent at home. Whether you need
          a few hours of support each week or comprehensive daily care, our licensed and insured
          caregivers are ready to help residents of {location.name} and the surrounding {county} area.
        </p>
        <p>
          Every care plan is tailored to the individual, and our team works closely with {location.name}
          families to coordinate schedules, communicate updates, and provide peace of mind. From
          short-term respite care to full-time companion care, we bring dependable support to your
          doorstep in {location.name}, TX.
        </p>

        <h2>Services Available in {location.name}</h2>
        <ul className="location-services-list">
          {servicesList.map((service) => (
            <li key={service.id}>
              <Link href={`/services/${service.id}`}>{service.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="location-map-section">
        <h2>{location.name}, TX Service Area Map</h2>
        <iframe
          className="location-map-frame"
          title={`Map of ${location.name}, TX`}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="location-nap">
          <p><strong>Dynamic Care Services</strong></p>
          <p>Serving {location.name}, TX and all of {county}</p>
          <p>Phone: <a href={`tel:+1${BUSINESS_PHONE_DISPLAY.replace(/\D/g, '')}`}>{BUSINESS_PHONE_DISPLAY}</a></p>
          <p>Email: <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a></p>
          <p>Hours: Mon-Fri 9AM-5PM, Closed Saturdays &amp; Sundays</p>
        </div>
      </section>

      <section className="location-cta">
        <Link href="/scheduling" className="location-cta-button">
          Schedule a Free Consultation in {location.name}
        </Link>
      </section>

      <section className="locations-related">
        <h3>We Also Serve Nearby Communities</h3>
        <ul className="locations-related-list">
          {otherLocations.map((item) => (
            <li key={item.slug}>
              <Link href={`/locations/${item.slug}`}>{item.name}, TX</Link>
            </li>
          ))}
          <li>
            <Link href="/locations">View All Service Areas</Link>
          </li>
        </ul>
      </section>

      <Footer />
    </div>
  )
}

export default LocationDetail
