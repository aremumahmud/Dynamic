import '../src/index.css'
import '../src/App.css'
import '../src/styles/theme.css'
import Providers from './providers'

const ICON_URL =
  'https://res.cloudinary.com/dvauarkh6/image/upload/v1763134507/dynamic-removebg-preview_nuiv3q.png'

export const metadata = {
  metadataBase: new URL('https://dynamiccareservicesllc.com'),
  title: 'Dynamic Care Services - Professional Home Care in Dallas-Fort Worth',
  description:
    'Professional home care services in Dallas-Fort Worth and surrounding areas. Dynamic Care Services provides compassionate personal care, companion care, respite care, specialized care, and end-of-life care. Licensed, insured, and trusted by families.',
  keywords: [
    'home care services',
    'Dallas-Fort Worth TX',
    'Dallas-Fort Worth home care',
    'senior care',
    'personal care services',
    'companion care',
    'respite care',
    'specialized care',
    'end-of-life care',
    'Dynamic Care Services',
    'Texas home care',
    'in-facility care',
  ],
  authors: [{ name: 'Dynamic Care Services' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: ICON_URL, type: 'image/png' },
      { url: ICON_URL, sizes: '32x32', type: 'image/png' },
      { url: ICON_URL, sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: ICON_URL, sizes: '180x180' },
      { url: ICON_URL, sizes: '152x152' },
      { url: ICON_URL, sizes: '144x144' },
      { url: ICON_URL, sizes: '120x120' },
      { url: ICON_URL, sizes: '114x114' },
      { url: ICON_URL, sizes: '76x76' },
      { url: ICON_URL, sizes: '72x72' },
      { url: ICON_URL, sizes: '57x57' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://dynamiccareservicesllc.com/',
  },
  verification: {
    google: 'FsELvPGymNXkg3tswVS95XYyasM_2xk884LKM8-Qwzc',
  },
  openGraph: {
    type: 'website',
    url: 'https://dynamiccareservicesllc.com/',
    title: 'Dynamic Care Services - Professional Home Care in Dallas-Fort Worth',
    description:
      'Professional home care services in Dallas-Fort Worth and surrounding areas. Compassionate personal care, companion care, respite care, specialized care, and end-of-life care. Licensed, insured, and trusted by families.',
    images: [{ url: ICON_URL, width: 1200, height: 630 }],
    siteName: 'Dynamic Care Services',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Care Services - Professional Home Care in Dallas-Fort Worth',
    description:
      'Professional home care services in Dallas-Fort Worth and surrounding areas. Compassionate personal care, companion care, respite care, specialized care, and end-of-life care.',
    images: [ICON_URL],
  },
  other: {
    'theme-color': '#044778',
    'msapplication-TileColor': '#044778',
    'msapplication-TileImage': ICON_URL,
    'geo.region': 'US-TX',
    'geo.placename': 'Dallas',
    'geo.position': '32.7767;-96.7970',
    ICBM: '32.7767, -96.7970',
    'business:contact_data:locality': 'Dallas',
    'business:contact_data:region': 'TX',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:phone_number': '+1 972-999-8499',
    'business:contact_data:email': 'info@dynamiccareservicesllc.com',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dynamic Care Services',
  alternateName: 'Dynamic Care',
  url: 'https://dynamiccareservicesllc.com',
  logo: ICON_URL,
  description:
    'Professional home care services in Dallas-Fort Worth and surrounding areas. Providing compassionate personal care, companion care, respite care, specialized care, and end-of-life care for seniors and individuals with disabilities.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1 972-999-8499',
    contactType: 'customer service',
    email: 'info@dynamiccareservicesllc.com',
    availableLanguage: 'English',
  },
  foundingDate: '2024',
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 32.7767,
      longitude: -96.7970,
    },
    geoRadius: '80000',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Home Care Services',
  description:
    'Professional home care services for seniors and individuals with disabilities in Dallas-Fort Worth and surrounding areas. Includes personal care, companion care, respite care, in-facility care, specialized care, and end-of-life care.',
  provider: {
    '@type': 'Organization',
    name: 'Dynamic Care Services',
    url: 'https://dynamiccareservicesllc.com',
  },
  areaServed: {
    '@type': 'City',
    name: 'Dallas',
    containedInPlace: {
      '@type': 'State',
      name: 'Texas',
    },
  },
  serviceType: 'Home Health Care',
  category: 'Health and Wellness',
  offers: {
    '@type': 'Offer',
    description:
      'Comprehensive home care services including personal care, companion care, respite care, specialized care, and end-of-life care',
    availability: 'https://schema.org/InStock',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://dynamiccareservicesllc.com/#organization',
  name: 'Dynamic Care Services',
  image: ICON_URL,
  description: 'Professional home care services in Dallas-Fort Worth and surrounding areas',
  url: 'https://dynamiccareservicesllc.com',
  telephone: '+1 972-999-8499',
  email: 'info@dynamiccareservicesllc.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.7767,
    longitude: -96.7970,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '00:00',
      closes: '00:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '00:00',
      closes: '00:00',
    },
  ],
  priceRange: '$$',
  paymentAccepted: 'Insurance, Visa, Mastercard, Discover',
  currenciesAccepted: 'USD',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
