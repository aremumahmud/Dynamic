import { notFound } from 'next/navigation'
import LocationDetail from '../../../src/views/LocationDetail'
import { locationsList, getLocationBySlug, county } from '../../../src/data/locationsData'

export function generateStaticParams() {
  return locationsList.map((location) => ({ city: location.slug }))
}

export async function generateMetadata({ params }) {
  const { city } = await params
  const location = getLocationBySlug(city)
  if (!location) {
    return {}
  }

  const title = `Home Care in ${location.name}, TX | Dynamic Care Services`
  const description = `Compassionate in-home senior and disability care in ${location.name}, TX. Personal care, companion care, respite care, and specialized care throughout ${county}.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://dynamiccareservicesllc.com/locations/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://dynamiccareservicesllc.com/locations/${location.slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { city } = await params
  const location = getLocationBySlug(city)

  if (!location) {
    notFound()
  }

  return <LocationDetail location={location} />
}
