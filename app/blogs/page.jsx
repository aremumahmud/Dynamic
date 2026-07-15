import BlogList from '../../src/views/BlogList'
import { getPublishedPosts } from '../../src/lib/blogService'

export const revalidate = 300

export const metadata = {
  title: 'Home Care Blog - Tips & Insights | Dynamic Care Services',
  description:
    'Read the Dynamic Care Services blog for home care tips, senior health and safety guidance, and family caregiver support articles for Dallas-Fort Worth families.',
  alternates: {
    canonical: 'https://dynamiccareservicesllc.com/blogs',
  },
}

export default async function Page() {
  let posts = []
  try {
    posts = await getPublishedPosts()
  } catch (error) {
    console.error('Failed to load blog posts from Firestore:', error.message)
  }

  return <BlogList posts={posts} />
}
