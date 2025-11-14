import './Trust.css'
import homeCopy from '../../copy/home.json'

function Trust() {
    const trustPoints = homeCopy.trust.trustPoints.map((point, index) => ({
        id: index + 1,
        title: point.title,
        description: point.description,
        icon: point.icon
    }));

    return (
        <section className="trust-section">
            <div className="trust-container">
                <div className="trust-header" data-aos="fade-up">
                    <h2 className="trust-title" dangerouslySetInnerHTML={{ __html: homeCopy.trust.title }}></h2>
                </div>

                <div className="trust-grid">
                    {trustPoints.map((point, index) => (
                        <div 
                            key={point.id} 
                            className="trust-item" 
                            data-aos="fade-up" 
                            data-aos-delay={`${(index + 1) * 150}`}
                        >
                            <div className="trust-icon">
                                {point.icon}
                            </div>
                            <h3 className="trust-item-title">{point.title}</h3>
                            <p className="trust-item-description">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Trust
