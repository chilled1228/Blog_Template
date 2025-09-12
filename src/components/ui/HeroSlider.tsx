'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';
import { BlogPost, getBlogPosts } from '@/lib/blogService';
import HeroSliderSkeleton from './HeroSliderSkeleton';
import { typography, textColors, textSpacing } from '@/lib/typography';


interface HeroSliderProps {
  posts?: BlogPost[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ posts }) => {
  const [activeSlide, setActiveSlide] = useState(0);
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
        const slidePosts = posts || await getBlogPosts();
        setSlides(slidePosts);
        if (slidePosts.length > 0) {
          setActiveSlide(0);
        }
      } catch (error) {
        console.error('Error fetching hero slider slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [posts]);

  const startAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    
    autoSlideInterval.current = setInterval(() => {
      if (!isPaused && slides.length > 0) {
        setActiveSlide(prev => (prev < slides.length - 1 ? prev + 1 : 0));
      }
    }, 4000);
  }, [isPaused, slides]);

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  useEffect(() => {
    if (slides.length > 1) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [slides, isPaused, startAutoSlide]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveSlide(prev => (prev < slides.length - 1 ? prev + 1 : 0));
    } else if (isRightSwipe) {
      setActiveSlide(prev => (prev > 0 ? prev - 1 : slides.length - 1));
    }
    
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleSlideChange = (slideIndex: number) => {
    setActiveSlide(slideIndex);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  if (loading) {
    return <HeroSliderSkeleton slideCount={posts?.length || 3} />;
  }

  if (slides.length === 0) {
    return null;
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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative overflow-hidden">
          <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-2 w-full transition-all duration-700 ${
                  activeSlide === index
                    ? 'opacity-100 translate-x-0 z-10'
                    : 'opacity-0 ' +
                      (index > activeSlide ? 'translate-x-full' : '-translate-x-full') +
                      ' z-0'
                }`}
              >
                <div className="flex items-center p-4 sm:p-6 lg:p-8 xl:p-12 order-2 lg:order-1 pb-16 sm:pb-6 lg:pb-8">
                  <div className={`w-full max-w-2xl transition-all duration-700 delay-100 ${
                    activeSlide === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.category && (
                      <ul className="mb-3 sm:mb-4">
                        <li>
                          <Link 
                            href={(slide.category_url || '#') as Route}
                            className="text-teal-600 hover:text-teal-700 font-semibold text-sm uppercase tracking-wider"
                          >
                            {slide.category}
                          </Link>
                        </li>
                      </ul>
                    )}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-800 line-clamp-3">
                      <Link 
                        href={`/${slide.slug}` as Route}
                        className="hover:text-teal-700 transition-colors duration-200"
                      >
                        {slide.title}
                      </Link>
                    </h1>
                    <p className="mt-4 text-stone-600 line-clamp-3">
                      {slide.excerpt || 'Read more about this article...'}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-stone-500">
                      <time dateTime={slide.datetime || slide.date}>
                        {slide.date}
                      </time>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden p-2 sm:p-3 lg:p-4 order-1 lg:order-2">
                  <Link href={`/${slide.slug}` as Route} className="block h-full group">
                    <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden">
                      <Image 
                        src={slide.image} 
                        alt={slide.title} 
                        fill
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        priority={activeSlide === index}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Slider Controls - Fixed Position */}
          <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 z-20">
            <ul className="flex gap-2">
              {slides.map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSlideChange(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out
                      ${activeSlide === index ? 'bg-teal-500 scale-125' : 'bg-stone-300 hover:bg-stone-400'}
                    `}
                    aria-label={`Go to slide ${index + 1}`}
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
