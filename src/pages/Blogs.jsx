import './Blogs.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { blogsData, blogCategories } from '../data/blogsData'
import blogsCopy from '../../copy/blogs.json'


function Blogs() {
    const { blogId } = useParams();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(blogsData);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let filtered = blogsData;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBlogs(filtered);
    }, [selectedCategory, searchTerm]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // If viewing a specific blog
    if (blogId) {
        const blog = blogsData.find(b => b.id === parseInt(blogId));
        if (!blog) {
            return (
                <div className="blogs-page">
                    <Header />
                    <div className="blog-not-found">
                        <h1>Blog not found</h1>
                        <p>The blog you're looking for doesn't exist.</p>
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div className="blogs-page">
                <Header />
                
                {/* Blog Article View */}
                <article className="blog-article-page">
                    <div className="blog-article-container">
                        <div className="blog-article-header">
                            <div className="blog-breadcrumb">
                                <a href="/blogs">{blogsCopy.articleView.backToBlogs}</a>
                            </div>
                            <div className="blog-article-meta">
                                <span className="blog-article-category">{blog.category}</span>
                                <span className="blog-article-date">{blog.date}</span>
                                <span className="blog-article-read-time">{blog.readTime}</span>
                            </div>
                            <h1 className="blog-article-title">{blog.title}</h1>
                            <p className="blog-article-excerpt">{blog.excerpt}</p>
                        </div>

                        <div className="blog-article-image">
                            <img src={blog.image} alt={blog.title} />
                        </div>

                        <div className="blog-article-content">
                            <div className="blog-article-text">
                                {blog.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="blog-article-footer">
                                <div className="blog-tags">
                                    {blog.tags && blog.tags.map((tag, index) => (
                                        <span key={index} className="blog-tag">{tag}</span>
                                    ))}
                                </div>
                                
                                <div className="blog-author">
                                    <div className="author-info">
                                        <img src={blog.author.image} alt={blog.author.name} className="author-image" />
                                        <div className="author-details">
                                            <h4 className="author-name">{blog.author.name}</h4>
                                            <p className="author-title">{blog.author.title}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="blog-cta">
                                    <h3>{blogsCopy.articleView.cta.title}</h3>
                                    <p>{blogsCopy.articleView.cta.description}</p>
                                    <button className="cta-button">{blogsCopy.articleView.cta.button}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        );
    }

    // Main blogs listing page
    return (
        <div className="blogs-page">
            <Header />
            
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
                            <div className="blogs-stats" data-aos="fade-up" data-aos-delay="200">
                                {blogsCopy.hero.stats.map((stat, index) => (
                                    <div key={index} className="stat">
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
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
                        {blogsCopy.searchAndFilter.categories.map((category) => (
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
                                <img src={filteredBlogs[0].image} alt={filteredBlogs[0].title} />
                                <div className="featured-category">{filteredBlogs[0].category}</div>
                            </div>
                            <div className="featured-content">
                                <div className="featured-meta">
                                    <span className="featured-date">{filteredBlogs[0].date}</span>
                                    <span className="featured-read-time">{filteredBlogs[0].readTime}</span>
                                </div>
                                <h2 className="featured-title">{filteredBlogs[0].title}</h2>
                                <p className="featured-excerpt">{filteredBlogs[0].excerpt}</p>
                                <a href={`/blogs/${filteredBlogs[0].id}`} className="featured-read-more">
                                    {blogsCopy.featuredArticle.readFullArticle}
                                    <span className="arrow">→</span>
                                </a>
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
                                        <img src={blog.image} alt={blog.title} />
                                        <div className="blog-category">{blog.category}</div>
                                    </div>
                                    
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span className="blog-date">{blog.date}</span>
                                            <span className="blog-read-time">{blog.readTime}</span>
                                        </div>
                                        
                                        <h3 className="blog-article-title">{blog.title}</h3>
                                        
                                        <p className="blog-excerpt">{blog.excerpt}</p>
                                        
                                        <a href={`/blogs/${blog.id}`} className="blog-read-more">
                                            {blogsCopy.blogGrid.readMore}
                                            <span className="arrow">→</span>
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {filteredBlogs.length > 9 && (
                        <div className="load-more" data-aos="fade-up">
                            <button className="load-more-btn">{blogsCopy.blogGrid.loadMore}</button>
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

export default Blogs
