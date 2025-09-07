import React from 'react';

const HeroSliderSkeleton: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="hero-slider">
        <div className="hero-slider-content">
          {/* Slider Controls Skeleton */}
          <ul className="slider-controls">
            {[1, 2, 3, 4, 5].map((index) => (
              <li key={index}>
                <div className="slider-control-button slider-control-button--inactive" />
              </li>
            ))}
          </ul>

          {/* Active Slide Skeleton */}
          <div className="slider-item">
            <div className="slide-text">
              <div className="slide-text-content">
                {/* Category Skeleton */}
                <div className="skeleton-line" style={{ width: '100px', height: '20px', marginBottom: '16px' }} />
                
                {/* Title Skeleton */}
                <div className="skeleton-line" style={{ width: '80%', height: '32px', marginBottom: '16px' }} />
                
                {/* Description Skeleton */}
                <div className="skeleton-line" style={{ width: '100%', height: '20px', marginBottom: '8px' }} />
                <div className="skeleton-line" style={{ width: '90%', height: '20px', marginBottom: '16px' }} />
                
                {/* Author Skeleton */}
                <div className="skeleton-line" style={{ width: '150px', height: '16px' }} />
              </div>
            </div>

            <div className="slide-image-container">
              <div className="slide-image-wrapper">
                <div className="skeleton-image" style={{ width: '100%', height: '100%', minHeight: '400px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderSkeleton;