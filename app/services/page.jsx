import Services from '../../src/views/Services'

export const metadata = {
  title: 'Home Care Services in Dallas-Fort Worth | Dynamic Care Services',
  description:
    'Explore our full range of home care services in Dallas-Fort Worth: personal care, companion care, respite care, specialized care, in-facility care, and end-of-life care.',
  alternates: {
    canonical: 'https://dynamiccareservicesllc.com/services',
  },
}

export default function Page() {
  return <Services />
}
