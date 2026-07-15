'use client'

import './Admin.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { marked } from 'marked'
import { adminFetch } from '../../lib/adminApiClient'
import { blogCategories } from '../../data/blogCategories'
import AdminGuard from '../../components/admin/AdminGuard'

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: blogCategories[1] || 'Senior Care',
  tags: '',
  featuredImage: '',
  authorName: 'Dynamic Care Services',
  authorTitle: '',
  status: 'draft',
  publishedAt: '',
  seoTitle: '',
  seoDescription: '',
}

function toDatetimeLocal(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60000)
  return local.toISOString().slice(0, 16)
}

function PostFormInner({ postId }) {
  const router = useRouter()
  const isEditing = Boolean(postId)
  const [form, setForm] = useState(EMPTY_POST)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editorTab, setEditorTab] = useState('write')

  useEffect(() => {
    if (!isEditing) return

    const loadPost = async () => {
      try {
        const data = await adminFetch(`/api/admin/posts/${postId}`)
        const post = data.post
        setForm({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || blogCategories[1],
          tags: (post.tags || []).join(', '),
          featuredImage: post.featuredImage || '',
          authorName: post.authorName || 'Dynamic Care Services',
          authorTitle: post.authorTitle || '',
          status: post.status || 'draft',
          publishedAt: toDatetimeLocal(post.publishedAt),
          seoTitle: post.seoTitle || '',
          seoDescription: post.seoDescription || '',
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [isEditing, postId])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
    }

    try {
      if (isEditing) {
        await adminFetch(`/api/admin/posts/${postId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        })
      } else {
        await adminFetch('/api/admin/posts', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }
      router.push('/admin/posts')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="admin-page"><p>Loading post...</p></div>
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-card">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="title">Title</label>
              <input id="title" value={form.title} onChange={handleChange('title')} required />
            </div>
            <div className="admin-form-group">
              <label htmlFor="slug">Slug (optional — auto-generated from title)</label>
              <input id="slug" value={form.slug} onChange={handleChange('slug')} placeholder="my-post-title" />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="excerpt">Excerpt (used for previews and meta description fallback)</label>
            <textarea id="excerpt" rows={2} value={form.excerpt} onChange={handleChange('excerpt')} />
          </div>

          <div className="admin-form-group">
            <label>Content (Markdown)</label>
            <div className="admin-editor-tabs">
              <button
                type="button"
                className={`admin-editor-tab ${editorTab === 'write' ? 'active' : ''}`}
                onClick={() => setEditorTab('write')}
              >
                Write
              </button>
              <button
                type="button"
                className={`admin-editor-tab ${editorTab === 'preview' ? 'active' : ''}`}
                onClick={() => setEditorTab('preview')}
              >
                Preview
              </button>
            </div>
            {editorTab === 'write' ? (
              <textarea
                rows={16}
                value={form.content}
                onChange={handleChange('content')}
                placeholder="Write your article in Markdown..."
              />
            ) : (
              <div
                className="admin-markdown-preview"
                dangerouslySetInnerHTML={{ __html: marked.parse(form.content || '*Nothing to preview yet.*') }}
              />
            )}
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="category">Category</label>
              <select id="category" value={form.category} onChange={handleChange('category')}>
                {blogCategories.filter((c) => c !== 'All').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input id="tags" value={form.tags} onChange={handleChange('tags')} placeholder="safety, seniors, home" />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="featuredImage">Featured Image URL</label>
            <input id="featuredImage" value={form.featuredImage} onChange={handleChange('featuredImage')} />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="authorName">Author Name</label>
              <input id="authorName" value={form.authorName} onChange={handleChange('authorName')} />
            </div>
            <div className="admin-form-group">
              <label htmlFor="authorTitle">Author Title</label>
              <input id="authorTitle" value={form.authorTitle} onChange={handleChange('authorTitle')} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={handleChange('status')}>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label htmlFor="publishedAt">
                {form.status === 'scheduled' ? 'Publish Date/Time' : 'Publish Date (optional)'}
              </label>
              <input
                id="publishedAt"
                type="datetime-local"
                value={form.publishedAt}
                onChange={handleChange('publishedAt')}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="seoTitle">SEO Title (optional — falls back to Title)</label>
            <input id="seoTitle" value={form.seoTitle} onChange={handleChange('seoTitle')} />
          </div>

          <div className="admin-form-group">
            <label htmlFor="seoDescription">SEO Meta Description (optional — falls back to Excerpt)</label>
            <textarea id="seoDescription" rows={2} value={form.seoDescription} onChange={handleChange('seoDescription')} />
          </div>

          <button type="submit" className="admin-btn" disabled={saving}>
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

function AdminPostForm({ postId }) {
  return (
    <AdminGuard>
      <PostFormInner postId={postId} />
    </AdminGuard>
  )
}

export default AdminPostForm
