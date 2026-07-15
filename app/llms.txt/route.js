import { servicesList } from '../../src/data/servicesData'
import { locationsList, county } from '../../src/data/locationsData'
import { getPublishedPosts } from '../../src/lib/blogService'

export const revalidate = 300

const SITE_URL = 'https://dynamiccareservicesllc.com'

export async function GET() {
  let posts = []
  try {
    posts = (await getPublishedPosts()).slice(0, 10)
  } catch (error) {
    console.error('llms.txt: failed to load blog posts from Firestore:', error.message)
  }

  const serviceLines = servicesList
    .map((service) => `- [${service.name}](${SITE_URL}/services/${service.id})`)
    .join('\n')

  const locationLines = locationsList
    .map((location) => `- [${location.name}, TX](${SITE_URL}/locations/${location.slug})`)
    .join('\n')

  const blogLines = posts.length
    ? posts.map((post) => `- [${post.title}](${SITE_URL}/blogs/${post.slug}): ${post.excerpt}`).join('\n')
    : '- (No published articles yet)'

  const content = `# Dynamic Care Services

> Dynamic Care Services provides compassionate, professional in-home care for seniors and individuals with disabilities throughout Dallas-Fort Worth and ${county}, TX — including personal care, companion care, respite care, specialized care, in-facility care, and end-of-life care.

Phone: 972-999-8499
Email: info@dynamiccareservicesllc.com
Service Area: Dallas-Fort Worth and ${county}, TX

## Company

- [About Us](${SITE_URL}/about): Who we are and our approach to care
- [Contact](${SITE_URL}/contact): Get in touch or request a consultation
- [Schedule a Consultation](${SITE_URL}/scheduling): Book a free care consultation
- [Careers](${SITE_URL}/careers): Join our caregiving team
- [Refer a Client](${SITE_URL}/refer-us): Refer someone to our services
- [Privacy Policy](${SITE_URL}/privacy-policy)
- [Terms & Conditions](${SITE_URL}/terms)

## Services

${serviceLines}

## Service Areas (${county}, TX)

${locationLines}

## Blog

${blogLines}

## Sitemap

Full machine-readable sitemap: ${SITE_URL}/sitemap.xml
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
