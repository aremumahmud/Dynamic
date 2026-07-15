import { getAdminDb } from './firebaseAdmin.js'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
export { blogCategories } from '../data/blogCategories.js'

const COLLECTION = 'blogPosts'

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function estimateReadTime(content) {
  const words = (content || '').trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function docToPost(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    publishedAt: data.publishedAt ? data.publishedAt.toDate().toISOString() : null,
    createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
  }
}

function isVisibleNow(post) {
  if (post.status === 'published') return true
  if (post.status === 'scheduled' && post.publishedAt) {
    return new Date(post.publishedAt) <= new Date()
  }
  return false
}

// Public: posts that are published, or scheduled posts whose time has arrived.
export async function getPublishedPosts() {
  const db = getAdminDb()
  const snapshot = await db.collection(COLLECTION).get()
  return snapshot.docs
    .map(docToPost)
    .filter(isVisibleNow)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export async function getPublishedPostBySlug(slug) {
  const db = getAdminDb()
  const snapshot = await db.collection(COLLECTION).where('slug', '==', slug).limit(1).get()
  if (snapshot.empty) return null
  const post = docToPost(snapshot.docs[0])
  return isVisibleNow(post) ? post : null
}

export async function getRelatedPosts(post, limit = 3) {
  if (!post) return []
  const posts = await getPublishedPosts()
  return posts.filter((item) => item.id !== post.id && item.category === post.category).slice(0, limit)
}

// Admin: every post regardless of status.
export async function getAllPostsForAdmin() {
  const db = getAdminDb()
  const snapshot = await db.collection(COLLECTION).get()
  return snapshot.docs.map(docToPost).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
}

export async function getPostByIdForAdmin(id) {
  const db = getAdminDb()
  const doc = await db.collection(COLLECTION).doc(id).get()
  if (!doc.exists) return null
  return docToPost(doc)
}

export async function createPost(input) {
  const db = getAdminDb()
  const now = FieldValue.serverTimestamp()
  const slug = input.slug ? slugify(input.slug) : slugify(input.title)

  const ref = await db.collection(COLLECTION).add({
    title: input.title,
    slug,
    excerpt: input.excerpt || '',
    content: input.content || '',
    category: input.category || 'All',
    tags: input.tags || [],
    featuredImage: input.featuredImage || '',
    authorName: input.authorName || 'Dynamic Care Services',
    authorTitle: input.authorTitle || '',
    status: input.status || 'draft',
    publishedAt: input.publishedAt ? Timestamp.fromDate(new Date(input.publishedAt)) : null,
    seoTitle: input.seoTitle || input.title,
    seoDescription: input.seoDescription || input.excerpt || '',
    readTime: estimateReadTime(input.content),
    createdAt: now,
    updatedAt: now,
  })

  return ref.id
}

export async function updatePost(id, input) {
  const db = getAdminDb()
  const updates = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  }

  if (input.slug) {
    updates.slug = slugify(input.slug)
  }
  if (input.content) {
    updates.readTime = estimateReadTime(input.content)
  }
  if ('publishedAt' in input) {
    updates.publishedAt = input.publishedAt ? Timestamp.fromDate(new Date(input.publishedAt)) : null
  }

  await db.collection(COLLECTION).doc(id).update(updates)
}

export async function deletePost(id) {
  const db = getAdminDb()
  await db.collection(COLLECTION).doc(id).delete()
}

