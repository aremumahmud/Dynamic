import { servicesList } from '../src/data/servicesData'
import { locationsList } from '../src/data/locationsData'
import { jobListings } from '../src/data/careersData'
import { getPublishedPosts } from '../src/lib/blogService'

const SITE_URL = 'https://dynamiccareservicesllc.com'

export default async function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/careers`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/blogs`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/refer-us`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/scheduling`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/locations`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ].map((route) => ({ ...route, lastModified: now }))

  const serviceRoutes = servicesList.map((service) => ({
    url: `${SITE_URL}/services/${service.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  let blogRoutes = []
  try {
    const posts = await getPublishedPosts()
    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Sitemap: failed to load blog posts from Firestore:', error.message)
  }

  const careerRoutes = Object.keys(jobListings).map((jobId) => ({
    url: `${SITE_URL}/careers/${jobId}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const locationRoutes = locationsList.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...careerRoutes, ...locationRoutes]
}
