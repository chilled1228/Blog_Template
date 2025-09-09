import React from 'react';
import HeroSliderSkeleton from './HeroSliderSkeleton';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import Skeleton from './Skeleton';

export default function HomePageLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider Skeleton */}
      <HeroSliderSkeleton />
      
      {/* Blog Posts Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <BlogPostCardSkeleton key={index} />
          ))}
        </div>
      </div>
      
      {/* Pagination Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center space-x-2">
          <Skeleton width="w-10" height="h-10" rounded={true} />
          <Skeleton width="w-10" height="h-10" rounded={true} className="mx-1" />
          <Skeleton width="w-10" height="h-10" rounded={true} />
          <span className="flex items-center mx-2">
            <Skeleton width="w-5" height="h-5" rounded={true} className="mx-1" />
            <Skeleton width="w-5" height="h-5" rounded={true} className="mx-1" />
          </span>
          <Skeleton width="w-10" height="h-10" rounded={true} className="mx-1" />
          <Skeleton width="w-10" height="h-10" rounded={true} />
        </div>
      </div>
    </div>
  );
}