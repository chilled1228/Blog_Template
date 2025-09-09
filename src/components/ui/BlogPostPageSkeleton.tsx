import React from 'react';
import Skeleton from './Skeleton';

export default function BlogPostPageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <div className="blog-content-wrapper">
        <article className="blog-article w-full">
          {/* Featured Image - Match exact dimensions */}
          <div className="blog-featured-image mb-6">
            <Skeleton width="w-full" height="h-64" rounded={true} />
          </div>

          {/* Title - Match exact spacing and dimensions */}
          <div className="blog-main-title mb-6 space-y-3">
            <Skeleton height="h-12" width="w-full" />
            <Skeleton height="h-12" width="w-3/4" />
          </div>

          {/* Author Section - Match exact layout */}
          <div className="blog-author-section flex items-center gap-2 flex-wrap mb-8">
            <div className="blog-author-avatar">
              <Skeleton width="w-6" height="h-6" rounded={true} />
            </div>
            <div className="blog-author-info flex items-center gap-2">
              <Skeleton width="w-8" height="h-4" />
              <Skeleton width="w-20" height="h-4" />
            </div>
            <div className="blog-meta-divider">
              <Skeleton width="w-2" height="h-4" />
            </div>
            <div className="blog-category-section">
              <Skeleton width="w-16" height="h-4" rounded={true} />
            </div>
            <div className="blog-meta-divider">
              <Skeleton width="w-2" height="h-4" />
            </div>
            <div className="blog-date-section">
              <Skeleton width="w-20" height="h-4" />
            </div>
          </div>

          {/* Content - Match typical blog content structure */}
          <div className="blog-content space-y-6">
            {/* First paragraph */}
            <div className="space-y-3">
              <Skeleton height="h-9" width="w-full" /> {/* H1 */}
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-11/12" />
              <Skeleton height="h-5" width="w-10/12" />
            </div>
            
            {/* Second section */}
            <div className="space-y-3 mt-8">
              <Skeleton height="h-8" width="w-3/5" /> {/* H2 */}
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-11/12" />
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-10/12" />
            </div>

            {/* Third section */}
            <div className="space-y-3 mt-8">
              <Skeleton height="h-8" width="w-1/2" /> {/* H2 */}
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-11/12" />
              <Skeleton height="h-5" width="w-full" />
            </div>

            {/* More content sections */}
            <div className="space-y-3 mt-8">
              <Skeleton height="h-7" width="w-2/3" /> {/* H3 */}
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-11/12" />
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-10/12" />
            </div>

            <div className="space-y-3 mt-8">
              <Skeleton height="h-7" width="w-3/5" /> {/* H3 */}
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-11/12" />
              <Skeleton height="h-5" width="w-full" />
            </div>

            {/* Additional content to match typical article length */}
            <div className="space-y-3 mt-8">
              <Skeleton height="h-8" width="w-1/2" /> {/* H2 */}
              <Skeleton height="h-5" width="w-full" />
              <Skeleton height="h-5" width="w-11/12" />
              <Skeleton height="h-5" width="w-10/12" />
              <Skeleton height="h-5" width="w-9/12" />
            </div>
          </div>

          {/* Author Footer - Match exact dimensions */}
          <div className="blog-author-footer flex items-center gap-4 mt-12 pt-6 border-t">
            <div className="blog-author-avatar-large">
              <Skeleton width="w-12" height="h-12" rounded={true} />
            </div>
            <div className="blog-author-footer-info space-y-1">
              <div className="flex items-center gap-2">
                <Skeleton width="w-8" height="h-4" />
                <Skeleton width="w-24" height="h-4" />
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Posts Section Skeleton */}
      <div className="mt-16">
        <Skeleton height="h-8" width="w-48" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton width="w-full" height="h-48" rounded={true} />
              <div className="space-y-2">
                <Skeleton height="h-5" width="w-full" />
                <Skeleton height="h-5" width="w-4/5" />
              </div>
              <div className="space-y-1">
                <Skeleton height="h-4" width="w-3/5" />
                <Skeleton height="h-4" width="w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}