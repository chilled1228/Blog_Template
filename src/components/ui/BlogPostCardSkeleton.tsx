import React from 'react';
import Skeleton from './Skeleton';

export default function BlogPostCardSkeleton() {
  return (
    <div className="blog-post-card">
      <div className="blog-post-image">
        <Skeleton height="200px" rounded={false} />
      </div>
      <div className="blog-post-content">
        <div className="blog-post-categories">
          <Skeleton width="80px" height="20px" rounded={true} />
        </div>
        <h3 className="blog-post-title">
          <Skeleton height="24px" width="100%" />
          <Skeleton height="24px" width="80%" className="mt-1" />
        </h3>
        <div className="blog-post-meta">
          <Skeleton width="120px" height="16px" />
          <Skeleton width="100px" height="16px" className="ml-2" />
        </div>
        <div className="blog-post-excerpt">
          <Skeleton height="16px" width="100%" />
          <Skeleton height="16px" width="90%" className="mt-1" />
          <Skeleton height="16px" width="85%" className="mt-1" />
        </div>
      </div>
    </div>
  );
}