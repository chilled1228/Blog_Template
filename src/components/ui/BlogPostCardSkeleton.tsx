import React from 'react';
import Skeleton from './Skeleton';

export default function BlogPostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col animate-pulse">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl m-2 sm:m-3">
        <Skeleton width="w-full" height="h-full" rounded={true} />
      </div>
      
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <div className="mb-3">
          <Skeleton width="w-16" height="h-5" rounded={true} />
        </div>
        
        <div className="mb-3 flex-grow">
          <Skeleton width="w-full" height="h-5" className="mb-2" />
          <Skeleton width="w-4/5" height="h-5" />
        </div>
        
        <div className="flex items-center gap-2 mt-auto">
          <Skeleton width="w-8" height="h-4" />
          <Skeleton width="w-20" height="h-4" />
          <Skeleton width="w-2" height="h-4" />
          <Skeleton width="w-16" height="h-4" />
        </div>
      </div>
    </div>
  );
}