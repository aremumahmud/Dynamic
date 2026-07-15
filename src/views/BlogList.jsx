'use client'

import './Blogs.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { blogCategories } from '../data/blogCategories'
import blogsCopy from '../../copy/blogs.json'

function formatDate(isoString) {
    if (!isoString) return ''
    return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function BlogList({ posts }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(posts);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let filtered = posts;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.content || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBlogs(filtered);
    }, [selectedCategory, searchTerm, posts]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="blogs-page">
            <Header />

            <Breadcrumbs items={[{ name: 'Blog', path: '/blogs' }]} />

            {/* Hero Section */}
            <section className="blogs-hero">
                <div className="blogs-hero-container">
                    <div className="blogs-hero-content">
                        <div className="blogs-hero-text" data-aos="fade-up">
                            <div className="blogs-badge">{blogsCopy.hero.badge}</div>
                            <h1 className="blogs-hero-title">
                                {blogsCopy.hero.title} <span className="highlight1">{blogsCopy.hero.titleHighlight}</span>
                            </h1>
                            <p className="blogs-hero-description">
                                {blogsCopy.hero.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="blogs-filter-section">
                <div className="blogs-filter-container">
                    <div className="blogs-search" data-aos="fade-up">
                        <div className="search-icon">🔍</div>
                        <input
                            type="text"
                            placeholder={blogsCopy.searchAndFilter.searchPlaceholder}
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>

                    <div className="blogs-categories" data-aos="fade-up" data-aos-delay="200">
                        {blogCategories.map((category) => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {filteredBlogs.length > 0 && selectedCategory === 'All' && !searchTerm && (
                <section className="featured-article-section">
                    <div className="featured-container">
                        <div className="featured-badge" data-aos="fade-up">{blogsCopy.featuredArticle.badge}</div>
                        <div className="featured-article" data-aos="fade-up" data-aos-delay="200">
                            <div className="featured-image">
                                <img src={filteredBlogs[0].featuredImage} alt={filteredBlogs[0].title} />
                                <div className="featured-category">{filteredBlogs[0].category}</div>
                            </div>
                            <div className="featured-content">
                                <div className="featured-meta">
                                    <span className="featured-date">{formatDate(filteredBlogs[0].publishedAt)}</span>
                                    <span className="featured-read-time">{filteredBlogs[0].readTime}</span>
                                </div>
                                <h2 className="featured-title">{filteredBlogs[0].title}</h2>
                                <p className="featured-excerpt">{filteredBlogs[0].excerpt}</p>
                                <Link href={`/blogs/${filteredBlogs[0].slug}`} className="featured-read-more">
                                    {blogsCopy.featuredArticle.readFullArticle}
                                    <span className="arrow">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="blogs-grid-section">
                <div className="blogs-grid-container">
                    {filteredBlogs.length === 0 ? (
                        <div className="no-results" data-aos="fade-up">
                            <h3>{blogsCopy.blogGrid.noResults.title}</h3>
                            <p>{blogsCopy.blogGrid.noResults.description}</p>
                        </div>
                    ) : (
                        <div className="blogs-grid">
                            {filteredBlogs.slice(selectedCategory === 'All' && !searchTerm ? 1 : 0).map((blog, index) => (
                                <article
                                    key={blog.id}
                                    className="blog-card"
                                    data-aos="fade-up"
                                    data-aos-delay={`${(index + 1) * 100}`}
                                >
                                    <div className="blog-image">
                                        <img src={blog.featuredImage} alt={blog.title} />
                                        <div className="blog-category">{blog.category}</div>
                                    </div>

                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span className="blog-date">{formatDate(blog.publishedAt)}</span>
                                            <span className="blog-read-time">{blog.readTime}</span>
                                        </div>

                                        <h3 className="blog-article-title">{blog.title}</h3>

                                        <p className="blog-excerpt">{blog.excerpt}</p>

                                        <Link href={`/blogs/${blog.slug}`} className="blog-read-more">
                                            {blogsCopy.blogGrid.readMore}
                                            <span className="arrow">→</span>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="blog-newsletter">
                <div className="newsletter-container">
                    <div className="newsletter-content" data-aos="fade-up">
                        <h2 className="newsletter-title">{blogsCopy.newsletter.title}</h2>
                        <p className="newsletter-description">
                            {blogsCopy.newsletter.description}
                        </p>
                        <div className="newsletter-form">
                            <input
                                type="email"
                                placeholder={blogsCopy.newsletter.emailPlaceholder}
                                className="newsletter-input"
                            />
                            <button className="newsletter-btn">{blogsCopy.newsletter.subscribeButton}</button>
                        </div>
                        <p className="newsletter-privacy">
                            {blogsCopy.newsletter.privacyText}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default BlogList
