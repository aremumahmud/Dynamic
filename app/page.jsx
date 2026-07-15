import Home from '../src/views/Home'
import { getPublishedPosts } from '../src/lib/blogService'

export const revalidate = 300

export default async function Page() {
  let posts = []
  try {
    posts = await getPublishedPosts()
  } catch (error) {
    console.error('Failed to load blog posts from Firestore:', error.message)
  }

  return <Home posts={posts} />
}
