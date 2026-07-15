'use client'

import './Blogs.css'
import { marked } from 'marked'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import blogsCopy from '../../copy/blogs.json'

function formatDate(isoString) {
    if (!isoString) return ''
    return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getInitials(name) {
    return (name || '')
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
}

function BlogArticle({ post, relatedPosts }) {
    if (!post) {
        return (
            <div className="blogs-page">
                <Header />
                <Breadcrumbs items={[{ name: 'Blog', path: '/blogs' }, { name: 'Not Found', path: '/blogs' }]} />
                <div className="blog-not-found">
                    <h1>Blog not found</h1>
                    <p>The blog you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="blogs-page">
            <Header />

            <Breadcrumbs items={[{ name: 'Blog', path: '/blogs' }, { name: post.title, path: `/blogs/${post.slug}` }]} />

            <article className="blog-article-page">
                <div className="blog-article-container">
                    <div className="blog-article-header">
                        <div className="blog-breadcrumb">
                            <Link href="/blogs">{blogsCopy.articleView.backToBlogs}</Link>
                        </div>
                        <div className="blog-article-meta">
                            <span className="blog-article-category">{post.category}</span>
                            <span className="blog-article-date">{formatDate(post.publishedAt)}</span>
                            <span className="blog-article-read-time">{post.readTime}</span>
                        </div>
                        <h1 className="blog-article-title">{post.title}</h1>
                        <p className="blog-article-excerpt">{post.excerpt}</p>
                    </div>

                    {post.featuredImage && (
                        <div className="blog-article-image">
                            <img src={post.featuredImage} alt={post.title} />
                        </div>
                    )}

                    <div className="blog-article-content">
                        <div
                            className="blog-article-text"
                            dangerouslySetInnerHTML={{ __html: marked.parse(post.content || '') }}
                        />

                        <div className="blog-article-footer">
                            {post.tags && post.tags.length > 0 && (
                                <div className="blog-tags">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="blog-tag">{tag}</span>
                                    ))}
                                </div>
                            )}

                            <div className="blog-author">
                                <div className="author-info">
                                    <div className="author-image author-image-initials" aria-hidden="true">
                                        {getInitials(post.authorName)}
                                    </div>
                                    <div className="author-details">
                                        <h4 className="author-name">{post.authorName}</h4>
                                        <p className="author-title">{post.authorTitle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="blog-cta">
                                <h3>{blogsCopy.articleView.cta.title}</h3>
                                <p>{blogsCopy.articleView.cta.description}</p>
                                <Link href="/scheduling" className="cta-button">{blogsCopy.articleView.cta.button}</Link>
                            </div>

                            {relatedPosts && relatedPosts.length > 0 && (
                                <div className="blog-related-posts">
                                    <h3>Related Articles</h3>
                                    <div className="blogs-grid">
                                        {relatedPosts.map((related) => (
                                            <article key={related.id} className="blog-card">
                                                <div className="blog-image">
                                                    <img src={related.featuredImage} alt={related.title} />
                                                    <div className="blog-category">{related.category}</div>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <span className="blog-date">{formatDate(related.publishedAt)}</span>
                                                        <span className="blog-read-time">{related.readTime}</span>
                                                    </div>
                                                    <h3 className="blog-article-title">{related.title}</h3>
                                                    <p className="blog-excerpt">{related.excerpt}</p>
                                                    <Link href={`/blogs/${related.slug}`} className="blog-read-more">
                                                        Read More
                                                        <span className="arrow">→</span>
                                                    </Link>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    )
}

export default BlogArticle
