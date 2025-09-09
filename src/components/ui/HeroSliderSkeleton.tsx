import React from 'react';
import Skeleton from './Skeleton';

const HeroSliderSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-xl sm:rounded-2xl transition-all duration-300 my-4 sm:my-8 overflow-hidden animate-pulse" style={{ background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 30%, #f4edec 70%, #efebe9 100%)', border: '1px solid #3d8a8e' }}>
        <div className="relative overflow-hidden">
          {/* Slider Container */}
          <div className="relative min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] max-h-[600px]">
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 w-full">
              {/* Text Content */}
              <div className="flex items-center p-4 sm:p-6 lg:p-8 xl:p-12 order-2 lg:order-1 pb-16 sm:pb-6 lg:pb-8">
                <div className="w-full max-w-2xl">
                  {/* Category Skeleton */}
                  <div className="mb-3 sm:mb-4">
                    <Skeleton width="w-16" height="h-4" rounded={true} />
                  </div>
                  
                  {/* Title Skeleton */}
                  <div className="mb-2 sm:mb-3 lg:mb-4">
                    <Skeleton width="w-4/5" height="h-8" className="mb-2" />
                    <Skeleton width="w-3/5" height="h-8" />
                  </div>
                  
                  {/* Description Skeleton */}
                  <div className="mb-3 sm:mb-4 lg:mb-6">
                    <Skeleton width="w-full" height="h-4" className="mb-2" />
                    <Skeleton width="w-5/6" height="h-4" />
                  </div>
                  
                  {/* Author Skeleton */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton width="w-8" height="h-3" />
                    <Skeleton width="w-20" height="h-3" />
                    <Skeleton width="w-2" height="h-3" />
                    <Skeleton width="w-16" height="h-3" />
                  </div>
                </div>
              </div>

              {/* Image Skeleton */}
              <div className="relative overflow-hidden p-2 sm:p-3 lg:p-4 order-1 lg:order-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-lg sm:rounded-xl overflow-hidden max-h-[180px] sm:max-h-[250px] lg:max-h-none">
                  <Skeleton width="w-full" height="h-full" rounded={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Slider Controls Skeleton */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 z-20">
            <div className="flex gap-2 sm:gap-3 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 lg:backdrop-blur-sm lg:shadow-md lg:px-4 lg:py-2" style={{ background: 'rgba(254, 249, 248, 0.9)' }}>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-400" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderSkeleton;