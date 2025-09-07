import React from 'react';
import HeroSliderSkeleton from './HeroSliderSkeleton';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import Skeleton from './Skeleton';

export default function HomePageLoading() {
  return (
    <div className="main-content">
      {/* Hero Slider Skeleton */}
      <HeroSliderSkeleton />
      
      {/* Blog Posts Grid Skeleton */}
      <div className="posts-grid-row">
        <div className="posts-grid">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <BlogPostCardSkeleton key={index} />
          ))}
        </div>
      </div>
      
      {/* Pagination Skeleton */}
      <div className="pagination-wrapper">
        <div className="pagination">
          <Skeleton width="40px" height="40px" rounded={true} />
          <Skeleton width="40px" height="40px" rounded={true} className="mx-1" />
          <Skeleton width="40px" height="40px" rounded={true} />
          <span className="pagination-dots">
            <Skeleton width="20px" height="20px" rounded={true} className="mx-1" />
            <Skeleton width="20px" height="20px" rounded={true} className="mx-1" />
          </span>
          <Skeleton width="40px" height="40px" rounded={true} className="mx-1" />
          <Skeleton width="40px" height="40px" rounded={true} />
        </div>
      </div>
    </div>
  );
}