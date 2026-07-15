import JobDetail from '../../../src/views/JobDetail'
import { jobListings } from '../../../src/data/careersData'

export function generateStaticParams() {
  return Object.keys(jobListings).map((jobId) => ({ jobId }))
}

export async function generateMetadata({ params }) {
  const { jobId } = await params
  const job = jobListings[jobId]
  if (!job) {
    return {}
  }

  return {
    title: `${job.title} - ${job.type} | Careers at Dynamic Care Services`,
    description: job.description.slice(0, 155),
    alternates: {
      canonical: `https://dynamiccareservicesllc.com/careers/${jobId}`,
    },
  }
}

export default function Page() {
  return <JobDetail />
}
