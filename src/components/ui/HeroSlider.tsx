'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getBlogPosts } from '@/lib/blogService';
import HeroSliderSkeleton from './HeroSliderSkeleton';
import { typography, textColors, textSpacing } from '@/lib/typography';


interface HeroSliderProps {
  posts?: BlogPost[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ posts }) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [slides, setSlides] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        // Use provided posts or fetch all published posts
        const slidePosts = posts || await getBlogPosts();
        setSlides(slidePosts);
        if (slidePosts.length > 0) {
          setActiveSlide(slidePosts[0].id || 1);
        }
      } catch (error) {
        console.error('Error fetching hero slider slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [posts]);

  // Auto-slide functionality
  const startAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    
    autoSlideInterval.current = setInterval(() => {
      if (!isPaused && slides.length > 0) {
        setActiveSlide(prev => {
          const currentIndex = slides.findIndex(slide => slide.id === prev);
          const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
          return slides[nextIndex].id || 1;
        });
      }
    }, 4000); // Change slide every 4 seconds
  }, [isPaused, slides]);

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  // Start auto-slide when slides are loaded
  useEffect(() => {
    if (slides.length > 1) {
      startAutoSlide();
    }
    
    return () => stopAutoSlide();
  }, [slides, isPaused, startAutoSlide]);

  // Touch handling functions
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause auto-slide on touch
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = slides.findIndex(slide => slide.id === activeSlide);
      if (isLeftSwipe && currentIndex < slides.length - 1) {
        setActiveSlide(slides[currentIndex + 1].id || 1);
      } else if (isRightSwipe && currentIndex > 0) {
        setActiveSlide(slides[currentIndex - 1].id || 1);
      } else if (isLeftSwipe && currentIndex === slides.length - 1) {
        setActiveSlide(slides[0].id || 1); // Loop to first
      } else if (isRightSwipe && currentIndex === 0) {
        setActiveSlide(slides[slides.length - 1].id || 1); // Loop to last
      }
    }
    
    // Resume auto-slide after 2 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Handle manual slide change
  const handleSlideChange = (slideId: number) => {
    setActiveSlide(slideId);
    setIsPaused(true);
    
    // Resume auto-slide after 3 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  if (loading) {
    return <HeroSliderSkeleton />;
  }

  if (slides.length === 0) {
    return null; // Don't show slider if no posts
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        ref={sliderRef}
        className="rounded-xl sm:rounded-2xl transition-all duration-300 my-6 sm:my-8 lg:my-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 30%, #f4edec 70%, #efebe9 100%)',
          border: '1px solid #3d8a8e'
        }}
        onMouseEnter={(e) => {
          setIsPaused(true);
          e.currentTarget.style.borderColor = '#4CA4A8';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(61, 138, 142, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          setIsPaused(false);
          e.currentTarget.style.borderColor = '#3d8a8e';
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.transform = '';
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative overflow-hidden">
          {/* Slides Container - Fixed height to prevent UI shift */}
          <div className="relative min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] max-h-[600px]">
            {slides.map((slide) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-2 w-full transition-all duration-700 ${
                  activeSlide === slide.id 
                    ? 'opacity-100 translate-x-0 scale-100 z-10' 
                    : 'opacity-0 translate-x-4 scale-95 z-0'
                }`} 
                data-index={slide.id}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
              >
              <div className="flex items-center p-4 sm:p-6 lg:p-8 xl:p-12 order-2 lg:order-1 pb-16 sm:pb-6 lg:pb-8">
                <div className={`w-full max-w-2xl transition-all duration-700 delay-100 ${
                  activeSlide === slide.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}>
                  {slide.category && (
                    <ul className="mb-3 sm:mb-4">
                      <li>
                        <Link 
                          href={slide.category_url || '#'}
                          className={`${typography.badge} inline-block transition-colors duration-200`}
                          style={{ color: '#4CA4A8' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#3d8a8e'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#4CA4A8'}
                        >
                          {slide.category}
                        </Link>
                      </li>
                    </ul>
                  )}
                  
                  <h1 className={`${typography.heroTitle} ${textSpacing.heading} line-clamp-2 sm:line-clamp-3`} style={{ color: '#44403D' }}>
                    <Link 
                      href={`/${slide.slug}`}
                      className={`${typography.link} transition-colors duration-200`}
                      style={{ color: 'inherit' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#4CA4A8'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#44403D'}
                    >
                      {slide.title}
                    </Link>
                  </h1>
                  
                  <p className={`${typography.heroSubtitle} ${textSpacing.relaxed} line-clamp-2 sm:line-clamp-3`} style={{ color: '#4B5D58' }}>
                    {slide.excerpt || 'Read more about this article...'}
                  </p>
                  
                  <div className={`flex flex-wrap items-center gap-1 sm:gap-2 ${typography.metaSmall} ${textColors.muted}`}>
                    <span>By</span>
                    <Link 
                      href={slide.author_url || '#'}
                      className={`${typography.link} truncate`}
                      style={{ color: '#4B5D58' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#4CA4A8'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#4B5D58'}
                    >
                      {slide.author}
                    </Link>
                    <span>•</span>
                    <time dateTime={slide.datetime || slide.date} className={textColors.muted}>
                      {slide.date}
                    </time>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden p-2 sm:p-3 lg:p-4 order-1 lg:order-2">
                <Link href={`/${slide.slug}`} className="block h-full group">
                  <div className={`relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-lg sm:rounded-xl overflow-hidden max-h-[180px] sm:max-h-[250px] lg:max-h-none transition-all duration-700 delay-200 ${
                    activeSlide === slide.id 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}>
                    <Image 
                      src={slide.image} 
                      alt={slide.title} 
                      fill
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      priority={activeSlide === slide.id}
                    />
                  </div>
                </Link>
              </div>
              </div>
            ))}
          </div>

          {/* Slider Controls - Positioned to avoid overlap */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 z-20">
            <ul className="flex gap-2 sm:gap-3 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 lg:backdrop-blur-sm lg:shadow-md lg:px-4 lg:py-2" style={{ background: 'rgba(254, 249, 248, 0.9)' }}>
              {slides.map((slide) => (
                <li key={slide.id}>
                  <button 
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      activeSlide === slide.id 
                        ? 'shadow-lg' 
                        : 'hover:bg-gray-600'
                    } ${activeSlide === slide.id ? '' : 'bg-gray-400'}`}
                    style={{
                      backgroundColor: activeSlide === slide.id ? '#4CA4A8' : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (activeSlide !== slide.id) {
                        e.currentTarget.style.backgroundColor = '#3d8a8e';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSlide !== slide.id) {
                        e.currentTarget.style.backgroundColor = '#9ca3af';
                      }
                    }}
                    onClick={() => handleSlideChange(slide.id || 1)}
                    data-index={slide.id}
                    aria-label={`Go to slide ${slide.id}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;