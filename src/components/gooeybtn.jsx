import './gooeybtn.css'

function GooeyBtn({text, variant = 'black', extendby = 0, direction = 'right'}) {
    const isRight = direction === 'right';
    const defaultTransform = isRight ? 'translateX(-40px)' : 'translateX(40px)';
    const defaultHoverTransform = isRight ? 'translateX(-84px)' : 'translateX(84px)';
    
    return (
        <div 
            className={`gooey-btn-container ${variant} ${direction}`} 
            style={{ 
                filter: "url(#gooey-filter)"
            }}
            onMouseEnter={(e) => {
                const arrow = e.currentTarget.querySelector('.gooey-btn-arrow');
                if (arrow && extendby) {
                    const transform = isRight ? `translateX(-${extendby}px)` : `translateX(${extendby}px)`;
                    arrow.style.transform = transform;
                }
            }}
            onMouseLeave={(e) => {
                const arrow = e.currentTarget.querySelector('.gooey-btn-arrow');
                if (arrow) {
                    arrow.style.transform = defaultTransform;
                }
            }}
        >
        {!isRight && (
            <button className={`gooey-btn-arrow ${variant} left`}>
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
        )}
        <button className={`gooey-btn-main ${variant}`}>
          {text}
        </button>
        {isRight && (
            <button className={`gooey-btn-arrow ${variant} right`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
        )}
      </div>
    )
}

export default GooeyBtn