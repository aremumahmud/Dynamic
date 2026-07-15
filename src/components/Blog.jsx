'use client'

import './Blog.css'
import Link from 'next/link'
import homeCopy from '../../copy/home.json'

function formatDate(isoString) {
    if (!isoString) return ''
    return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function Blog({ posts = [] }) {
    const articles = posts.slice(0, 6);

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="blog-section">
            <div className="blog-container">
                <div className="blog-header" data-aos="fade-up">
                    <div className="blog-badge">{homeCopy.blog.badge}</div>
                    <h2 className="blog-title">{homeCopy.blog.title}</h2>
                    <p className="blog-subtitle">
                        {homeCopy.blog.subtitle}
                    </p>
                </div>

                <div className="blog-grid">
                    {articles.map((article, index) => (
                        <article 
                            key={article.id} 
                            className="blog-card" 
                            data-aos="fade-up" 
                            data-aos-delay={`${(index + 1) * 100}`}
                        >
                            <div className="blog-image">
                                <img src={article.featuredImage} alt={article.title} />
                                <div className="blog-category">{article.category}</div>
                            </div>

                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">{formatDate(article.publishedAt)}</span>
                                    <span className="blog-read-time">{article.readTime}</span>
                                </div>

                                <h3 className="blog-article-title">{article.title}</h3>

                                <p className="blog-excerpt">{article.excerpt}</p>

                                <Link href={`/blogs/${article.slug}`} className="blog-read-more">
                                    {homeCopy.blog.readMoreButton}
                                    <span className="arrow">→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blog-footer" data-aos="fade-up" data-aos-delay="700">
                    <Link href="/blogs" className="view-all-btn">
                        {homeCopy.blog.viewAllButton}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Blog
