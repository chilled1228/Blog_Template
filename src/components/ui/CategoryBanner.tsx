import React from 'react';
import Image from 'next/image';

interface CategoryBannerProps {
  title: string;
  description: string;
  image: string;
  postCount?: number;
}

export default function CategoryBanner({ title, description, image, postCount }: CategoryBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-8">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={`${title} category banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CA4A8]/90 via-[#4B5D58]/80 to-[#44403D]/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto mb-6 leading-relaxed">
            {description}
          </p>
          {postCount !== undefined && (
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {postCount} {postCount === 1 ? 'Article' : 'Articles'}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fef9f8] to-transparent"></div>
    </div>
  );
}