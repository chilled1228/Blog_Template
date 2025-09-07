import React from 'react';
import Skeleton from './Skeleton';

export default function HeroSliderSkeleton() {
  return (
    <div className="wrapper">
      <div className="hero-slider">
        <div className="hero-slider-content">
          {/* Slider Controls */}
          <ul className="slider-controls">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <li key={index}>
                <div className="slider-control-button slider-control-button--skeleton">
                  <Skeleton width="12px" height="12px" rounded={true} />
                </div>
              </li>
            ))}
          </ul>

          {/* Active Slide */}
          <div className="slider-item">
            <div className="slide-text">
              <div className="slide-text-content">
                <div className="slide-categories-list">
                  <div className="slide-category-item">
                    <Skeleton width="60px" height="20px" rounded={true} />
                  </div>
                </div>
                
                <h2 className="slide-title">
                  <Skeleton height="32px" width="100%" />
                  <Skeleton height="32px" width="80%" className="mt-1" />
                </h2>
                
                <div className="slide-description">
                  <Skeleton height="20px" width="100%" />
                  <Skeleton height="20px" width="90%" className="mt-1" />
                  <Skeleton height="20px" width="85%" className="mt-1" />
                </div>
                
                <div className="slide-author">
                  <Skeleton width="140px" height="16px" />
                </div>
              </div>
            </div>

            <div className="slide-image-container">
              <div className="slide-image-wrapper">
                <Skeleton height="400px" rounded={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}