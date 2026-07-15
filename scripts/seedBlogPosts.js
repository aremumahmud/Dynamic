// One-time script to import the original static blog posts into Firestore.
// Run with: node scripts/seedBlogPosts.js
// Requires FIREBASE_SERVICE_ACCOUNT_KEY to be set in the environment.

import { blogsData } from '../src/data/blogsData.js'
import { createPost, slugify } from '../src/lib/blogService.js'

async function seed() {
  console.log(`Seeding ${blogsData.length} blog posts into Firestore...`)

  for (const post of blogsData) {
    const id = await createPost({
      title: post.title,
      slug: slugify(post.title),
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags || [],
      featuredImage: post.image,
      authorName: post.author?.name || 'Dynamic Care Services',
      authorTitle: post.author?.title || '',
      status: 'published',
      publishedAt: new Date(post.date).toISOString(),
      seoTitle: post.title,
      seoDescription: post.excerpt,
    })
    console.log(`  Created "${post.title}" -> ${id}`)
  }

  console.log('Done.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
