import React from 'react';
import Skeleton from './Skeleton';

export default function BlogPostPageSkeleton() {
  return (
    <div className="blog-container">
      <div className="blog-content-wrapper">
        <article className="blog-article">
          {/* Featured Image */}
          <div className="blog-featured-image">
            <Skeleton height="400px" rounded={false} />
          </div>

          {/* Title */}
          <div className="blog-main-title">
            <Skeleton height="40px" width="100%" />
            <Skeleton height="40px" width="70%" className="mt-2" />
          </div>

          {/* Author Section */}
          <div className="blog-author-section">
            <div className="blog-author-avatar">
              <Skeleton width="48px" height="48px" rounded={true} />
            </div>
            <div className="blog-author-info">
              <Skeleton width="100px" height="16px" />
              <Skeleton width="80px" height="14px" className="mt-1" />
            </div>
            <div className="blog-meta-divider">
              <Skeleton width="20px" height="16px" />
            </div>
            <div className="blog-category-section">
              <Skeleton width="80px" height="16px" rounded={true} />
            </div>
            <div className="blog-meta-divider">
              <Skeleton width="20px" height="16px" />
            </div>
            <div className="blog-date-section">
              <Skeleton width="100px" height="16px" />
            </div>
          </div>

          {/* Content */}
          <div className="blog-content">
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="95%" className="mt-2" />
            <Skeleton height="20px" width="90%" className="mt-2" />
            <Skeleton height="20px" width="85%" className="mt-2" />
            <Skeleton height="20px" width="92%" className="mt-2" />
            <Skeleton height="20px" width="88%" className="mt-2" />
            <Skeleton height="20px" width="94%" className="mt-2" />
            <Skeleton height="20px" width="87%" className="mt-2" />
          </div>

          {/* Author Footer */}
          <div className="blog-author-footer">
            <div className="blog-author-avatar-large">
              <Skeleton width="96px" height="96px" rounded={true} />
            </div>
            <div className="blog-author-footer-info">
              <Skeleton width="120px" height="18px" />
              <Skeleton width="100px" height="14px" className="mt-1" />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}