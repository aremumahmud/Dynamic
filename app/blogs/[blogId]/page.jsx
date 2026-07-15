import BlogArticle from '../../../src/views/BlogArticle'
import JsonLd from '../../../src/components/JsonLd'
import { getPublishedPostBySlug, getRelatedPosts } from '../../../src/lib/blogService'
import { articleSchema } from '../../../src/lib/schema'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { blogId } = await params

  let post = null
  try {
    post = await getPublishedPostBySlug(blogId)
  } catch {
    return {}
  }

  if (!post) {
    return {}
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt

  return {
    title: `${title} | Dynamic Care Services Blog`,
    description,
    alternates: {
      canonical: `https://dynamiccareservicesllc.com/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  }
}

export default async function Page({ params }) {
  const { blogId } = await params

  let post = null
  let relatedPosts = []

  try {
    post = await getPublishedPostBySlug(blogId)
    if (post) {
      relatedPosts = await getRelatedPosts(post)
    }
  } catch (error) {
    console.error('Failed to load blog post from Firestore:', error.message)
  }

  return (
    <>
      {post && (
        <JsonLd
          data={articleSchema({
            headline: post.title,
            description: post.seoDescription || post.excerpt,
            image: post.featuredImage,
            datePublished: post.publishedAt,
            authorName: post.authorName,
            url: `/blogs/${post.slug}`,
          })}
        />
      )}
      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </>
  )
}
