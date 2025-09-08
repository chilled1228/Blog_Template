'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getFeaturedPosts } from '@/lib/blogService';
import HeroSliderSkeleton from './HeroSliderSkeleton';


const HeroSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [slides, setSlides] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const featuredPosts = await getFeaturedPosts(5);
        setSlides(featuredPosts);
        if (featuredPosts.length > 0) {
          setActiveSlide(featuredPosts[0].id || 1);
        }
      } catch (error) {
        console.error('Error fetching hero slider slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <HeroSliderSkeleton />;
  }

  if (slides.length === 0) {
    return null; // Don't show slider if no posts
  }

  return (
    <div className="wrapper">
      <div className="hero-slider">
        <div className="hero-slider-content">
          {/* Slider Controls */}
          <ul className="slider-controls">
            {slides.map((slide) => (
              <li key={slide.id}>
                <button 
                  className={`slider-control-button ${
                    activeSlide === slide.id 
                      ? 'slider-control-button--active' 
                      : 'slider-control-button--inactive'
                  }`}
                  onClick={() => setActiveSlide(slide.id || 1)}
                  data-index={slide.id}
                  aria-label={`Go to slide ${slide.id}`}
                />
              </li>
            ))}
          </ul>

          {/* Slides */}
          {slides.map((slide) => (
            <div 
              key={slide.id}
              className={`slider-item ${activeSlide === slide.id ? '' : 'slider-item--inactive'}`} 
              data-index={slide.id}
            >
              <div className="slide-text">
                <div className="slide-text-content">
                  <Link 
                    href={slide.category_url || '#'} 
                    className="slide-category-link"
                  >
                    {/* Empty link as in original */}
                  </Link>
                  
                  <ul className="slide-categories-list">
                    <li className="slide-category-item">
                      <Link 
                        href={slide.category_url || '#'}
                        className="slide-category-item-link"
                      >
                        {slide.category}
                      </Link>
                    </li>
                  </ul>
                  
                  <h2 className="slide-title">
                    <Link 
                      href={`/${slide.slug}`}
                      className="slide-title-link"
                    >
                      {slide.title}
                    </Link>
                  </h2>
                  
                  <p className="slide-description">
                    {slide.excerpt || 'Read more about this article...'}
                  </p>
                  
                  <p className="slide-author">
                    By{' '}
                    <Link 
                      href={slide.author_url || '#'}
                      className="slide-author-link"
                    >
                      {slide.author}
                    </Link>
                    {' '}
                    <time dateTime={slide.datetime || slide.date} className="slide-date">
                      {slide.date}
                    </time>
                  </p>
                </div>
              </div>

              <div className="slide-image-container">
                <Link href={`/${slide.slug}`} className="slide-image-link">
                  <div className="slide-image-wrapper">
                    <Image 
                      src={slide.image} 
                      alt={slide.title} 
                      fill
                      className="slide-image"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={activeSlide === slide.id}
                    />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;