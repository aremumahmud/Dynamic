'use client'

import './Admin.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { getClientAuth } from '../../lib/firebaseClient'
import { adminFetch } from '../../lib/adminApiClient'
import AdminGuard from '../../components/admin/AdminGuard'

function PostsListInner() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = async () => {
    setLoading(true)
    try {
      const data = await adminFetch('/api/admin/posts')
      setPosts(data.posts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await adminFetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSignOut = async () => {
    await signOut(getClientAuth())
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Blog Posts</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/admin/posts/new" className="admin-btn">+ New Post</Link>
            <button className="admin-btn secondary" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-card">
          {loading ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet. Create your first post to get started.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>
                      <span className={`admin-status-badge ${post.status}`}>{post.status}</span>
                    </td>
                    <td>{post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : '—'}</td>
                    <td className="admin-table-actions">
                      <Link href={`/admin/posts/${post.id}`} className="admin-btn secondary">Edit</Link>
                      <button className="admin-btn danger" onClick={() => handleDelete(post.id, post.title)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

function AdminPostsList() {
  return (
    <AdminGuard>
      <PostsListInner />
    </AdminGuard>
  )
}

export default AdminPostsList
