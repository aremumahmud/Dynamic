'use client'

import './Legal.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from '../lib/schema'

function Terms() {
    return (
        <div className="legal-page">
            <Header />

            <Breadcrumbs items={[{ name: 'Terms & Conditions', path: '/terms' }]} />

            <section className="legal-hero">
                <h1>Terms &amp; Conditions</h1>
                <p>Last updated: January 2026</p>
            </section>

            <section className="legal-content">
                <p>
                    These Terms &amp; Conditions govern your use of the Dynamic Care Services website. By using
                    this site, you agree to these terms.
                </p>

                <h2>Use of This Website</h2>
                <p>
                    This website is provided for informational purposes to help you learn about and request
                    Dynamic Care Services&apos; home care offerings in Dallas-Fort Worth and Collin County, TX.
                    You agree not to misuse the site or attempt to disrupt its normal operation.
                </p>

                <h2>No Medical Advice</h2>
                <p>
                    Content on this website, including blog articles, is provided for general informational
                    purposes only and does not constitute medical advice. Always consult a qualified healthcare
                    provider regarding specific medical or care decisions.
                </p>

                <h2>Service Availability</h2>
                <p>
                    Services described on this website are subject to availability, assessment, and applicable
                    service area coverage within Collin County and the greater Dallas-Fort Worth area.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                    All content on this website, including text, images, and graphics, is the property of Dynamic
                    Care Services unless otherwise noted, and may not be reproduced without permission.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    Dynamic Care Services is not liable for any indirect, incidental, or consequential damages
                    arising from your use of this website.
                </p>

                <h2>Changes to These Terms</h2>
                <p>
                    We may update these Terms &amp; Conditions from time to time. Continued use of the website
                    after changes are posted constitutes acceptance of the updated terms.
                </p>

                <h2>Contact Us</h2>
                <p>
                    Questions about these Terms &amp; Conditions can be sent to{' '}
                    <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a> or{' '}
                    <a href={`tel:+1${BUSINESS_PHONE_DISPLAY.replace(/\D/g, '')}`}>{BUSINESS_PHONE_DISPLAY}</a>.
                </p>
            </section>

            <Footer />
        </div>
    )
}

export default Terms
