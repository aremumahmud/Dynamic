import './Blog.css'
import { Link } from 'react-router-dom'
import { blogsData } from '../data/blogsData'
import homeCopy from '../../copy/home.json'

function Blog() {
    // Use the same data structure as Blogs.jsx but limit to 6 articles for home page
    const articles = blogsData.slice(0, 6).map((article, index) => ({
        id: article.id,
        title: article.title,
        category: article.category,
        date: article.date,
        readTime: article.readTime,
        excerpt: article.excerpt,
        image: homeCopy.images.blog.articleImages[index] || article.image
    }));

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
                                <img src={article.image} alt={article.title} />
                                <div className="blog-category">{article.category}</div>
                            </div>
                            
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">{article.date}</span>
                                    <span className="blog-read-time">{article.readTime}</span>
                                </div>
                                
                                <h3 className="blog-article-title">{article.title}</h3>
                                
                                <p className="blog-excerpt">{article.excerpt}</p>
                                
                                <Link to={`/blogs/${article.id}`} className="blog-read-more">
                                    {homeCopy.blog.readMoreButton}
                                    <span className="arrow">→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blog-footer" data-aos="fade-up" data-aos-delay="700">
                    <Link to="/blogs" className="view-all-btn">
                        {homeCopy.blog.viewAllButton}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Blog
