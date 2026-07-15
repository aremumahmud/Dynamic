import Locations from '../../src/views/Locations'

export const metadata = {
  title: 'Service Areas - Home Care in Collin County, TX | Dynamic Care Services',
  description:
    'Dynamic Care Services provides in-home senior and disability care throughout Collin County, TX, including Plano, Frisco, McKinney, Allen, Richardson, and more.',
  alternates: {
    canonical: 'https://dynamiccareservicesllc.com/locations',
  },
}

export default function Page() {
  return <Locations />
}
