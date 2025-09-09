import React from 'react';
import Skeleton from './Skeleton';

export default function BlogPostPageSkeleton() {
  return (
    <div className="blog-container">
      <div className="blog-content-wrapper">
        <article className="blog-article">
          {/* Featured Image - Match exact dimensions */}
          <div className="blog-featured-image">
            <div className="w-full aspect-[2/1] max-h-[400px] bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Title - Match exact spacing and dimensions */}
          <div className="blog-main-title space-y-3">
            <Skeleton height="48px" width="100%" />
            <Skeleton height="48px" width="75%" />
          </div>

          {/* Author Section - Match exact layout */}
          <div className="blog-author-section flex items-center gap-2 flex-wrap">
            <div className="blog-author-avatar">
              <Skeleton width="24px" height="24px" rounded={true} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton width="30px" height="16px" />
              <Skeleton width="80px" height="16px" />
            </div>
            <div className="blog-meta-divider">
              <Skeleton width="8px" height="16px" />
            </div>
            <div className="blog-category-section">
              <Skeleton width="60px" height="16px" rounded={true} />
            </div>
            <div className="blog-meta-divider">
              <Skeleton width="8px" height="16px" />
            </div>
            <div className="blog-date-section">
              <Skeleton width="80px" height="16px" />
            </div>
          </div>

          {/* Content - Match typical blog content structure */}
          <div className="blog-content space-y-4">
            {/* First paragraph */}
            <div className="space-y-3">
              <Skeleton height="36px" width="100%" /> {/* H1 */}
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="95%" />
              <Skeleton height="20px" width="88%" />
            </div>
            
            {/* Second section */}
            <div className="space-y-3 mt-8">
              <Skeleton height="32px" width="60%" /> {/* H2 */}
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="92%" />
              <Skeleton height="20px" width="96%" />
              <Skeleton height="20px" width="85%" />
            </div>

            {/* Third section */}
            <div className="space-y-3 mt-8">
              <Skeleton height="32px" width="55%" /> {/* H2 */}
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="88%" />
              <Skeleton height="20px" width="93%" />
            </div>

            {/* More content sections */}
            <div className="space-y-3 mt-8">
              <Skeleton height="28px" width="65%" /> {/* H3 */}
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="91%" />
              <Skeleton height="20px" width="94%" />
              <Skeleton height="20px" width="87%" />
            </div>

            <div className="space-y-3 mt-8">
              <Skeleton height="28px" width="58%" /> {/* H3 */}
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="89%" />
              <Skeleton height="20px" width="95%" />
            </div>

            {/* Additional content to match typical article length */}
            <div className="space-y-3 mt-8">
              <Skeleton height="32px" width="50%" /> {/* H2 */}
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="93%" />
              <Skeleton height="20px" width="90%" />
              <Skeleton height="20px" width="86%" />
            </div>
          </div>

          {/* Author Footer - Match exact dimensions */}
          <div className="blog-author-footer flex items-center gap-4 mt-12">
            <div className="blog-author-avatar-large">
              <Skeleton width="48px" height="48px" rounded={true} />
            </div>
            <div className="blog-author-footer-info space-y-1">
              <div className="flex items-center gap-2">
                <Skeleton width="30px" height="16px" />
                <Skeleton width="100px" height="16px" />
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Posts Section Skeleton */}
      <div className="mt-16">
        <Skeleton height="32px" width="200px" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton height="200px" width="100%" rounded={true} />
              <div className="space-y-2">
                <Skeleton height="20px" width="100%" />
                <Skeleton height="20px" width="80%" />
              </div>
              <div className="space-y-1">
                <Skeleton height="14px" width="60%" />
                <Skeleton height="14px" width="40%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}