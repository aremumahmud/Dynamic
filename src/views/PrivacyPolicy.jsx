'use client'

import './Legal.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from '../lib/schema'

function PrivacyPolicy() {
    return (
        <div className="legal-page">
            <Header />

            <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />

            <section className="legal-hero">
                <h1>Privacy Policy</h1>
                <p>Last updated: January 2026</p>
            </section>

            <section className="legal-content">
                <p>
                    Dynamic Care Services (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy
                    and is committed to protecting the personal information you share with us through our website
                    and care services in Dallas-Fort Worth and surrounding Collin County communities.
                </p>

                <h2>Information We Collect</h2>
                <p>We may collect the following types of information when you use our website or contact us:</p>
                <ul>
                    <li>Contact information such as your name, phone number, and email address</li>
                    <li>Information submitted through contact, scheduling, or referral forms</li>
                    <li>Details about your care needs that you voluntarily provide</li>
                    <li>General usage data collected automatically, such as browser type and pages visited</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <ul>
                    <li>To respond to inquiries and schedule consultations</li>
                    <li>To provide, coordinate, and improve our home care services</li>
                    <li>To send requested updates, confirmations, and follow-up communications</li>
                    <li>To comply with legal and regulatory obligations</li>
                </ul>

                <h2>How We Protect Your Information</h2>
                <p>
                    We use reasonable administrative and technical safeguards to protect the personal information
                    you share with us. Access to your information is limited to authorized staff who need it to
                    provide or coordinate care.
                </p>

                <h2>Sharing of Information</h2>
                <p>
                    We do not sell your personal information. We may share information with trusted service
                    providers (such as email delivery services) solely to operate our business, or as required by law.
                </p>

                <h2>Your Choices</h2>
                <p>
                    You may request access to, correction of, or deletion of your personal information by
                    contacting us using the information below.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have questions about this Privacy Policy, please contact us at{' '}
                    <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a> or call{' '}
                    <a href={`tel:+1${BUSINESS_PHONE_DISPLAY.replace(/\D/g, '')}`}>{BUSINESS_PHONE_DISPLAY}</a>.
                </p>
            </section>

            <Footer />
        </div>
    )
}

export default PrivacyPolicy
