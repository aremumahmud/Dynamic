// JSON-LD structured data builders shared across pages

export const SITE_URL = 'https://dynamiccareservicesllc.com'
export const BUSINESS_NAME = 'Dynamic Care Services'
export const BUSINESS_PHONE = '+1 972-999-8499'
export const BUSINESS_PHONE_DISPLAY = '972-999-8499'
export const BUSINESS_EMAIL = 'info@dynamiccareservicesllc.com'
export const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  addressRegion: 'TX',
  addressCountry: 'US',
}
export const BUSINESS_GEO = {
  '@type': 'GeoCoordinates',
  latitude: 32.7767,
  longitude: -96.7970,
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function serviceSchema({ name, description, url, areaServed }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: BUSINESS_PHONE,
    },
    areaServed: areaServed || { '@type': 'State', name: 'Texas' },
    serviceType: name,
    category: 'Health and Wellness',
  }
}

export function articleSchema({ headline, description, image, datePublished, authorName, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished,
    author: {
      '@type': 'Person',
      name: authorName || BUSINESS_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${url}`,
  }
}

export function reviewSchema(testimonials) {
  if (!testimonials || testimonials.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(testimonials.length),
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewBody: testimonial.feedback,
    })),
  }
}

export function localBusinessSchemaForCity(cityName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/locations/${cityName.toLowerCase().replace(/\s+/g, '-')}#organization`,
    name: `${BUSINESS_NAME} - ${cityName}, TX`,
    url: `${SITE_URL}/locations/${cityName.toLowerCase().replace(/\s+/g, '-')}`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: {
      ...BUSINESS_ADDRESS,
      addressLocality: cityName,
    },
    geo: BUSINESS_GEO,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Collin County',
      },
    },
    priceRange: '$$',
  }
}
