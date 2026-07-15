import Services from '../../../src/views/Services'
import JsonLd from '../../../src/components/JsonLd'
import { servicesData, servicesList } from '../../../src/data/servicesData'
import { serviceSchema } from '../../../src/lib/schema'

export function generateStaticParams() {
  return servicesList.map((service) => ({ serviceId: service.id }))
}

export async function generateMetadata({ params }) {
  const { serviceId } = await params
  const service = servicesData[serviceId]
  if (!service) {
    return {}
  }

  return {
    title: `${service.title} in Dallas-Fort Worth | Dynamic Care Services`,
    description: service.description.slice(0, 155),
    alternates: {
      canonical: `https://dynamiccareservicesllc.com/services/${serviceId}`,
    },
  }
}

export default async function Page({ params }) {
  const { serviceId } = await params
  const service = servicesData[serviceId]

  return (
    <>
      {service && (
        <JsonLd
          data={serviceSchema({
            name: service.title,
            description: service.description,
            url: `/services/${serviceId}`,
          })}
        />
      )}
      <Services />
    </>
  )
}
