'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SlideData {
  id: number;
  category: string;
  categoryUrl: string;
  title: string;
  url: string;
  description: string;
  author: string;
  authorUrl: string;
  date: string;
  image: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    category: 'Technology',
    categoryUrl: '/category/technology/',
    title: 'Future of Web Development: Trends 2025',
    url: '/blog/future-of-web-development-trends-2025',
    description: 'Explore the latest trends shaping web development in 2025, including AI integration, new frameworks, and emerging technologies.',
    author: 'Tech Team',
    authorUrl: '/author/tech-team/',
    date: 'June 15, 2025',
    image: '/images/Workshop-Jerrod-Lew-Cover.png'
  },
  {
    id: 2,
    category: 'Backend',
    categoryUrl: '/category/backend/',
    title: 'Building Scalable APIs with Node.js and Express',
    url: '/blog/building-scalable-apis-nodejs-express',
    description: 'Learn how to build robust and scalable APIs using Node.js and Express framework with best practices and patterns.',
    author: 'Backend Team',
    authorUrl: '/author/backend-team/',
    date: 'June 10, 2025',
    image: '/images/Frame-7-1.jpg'
  },
  {
    id: 3,
    category: 'Frontend',
    categoryUrl: '/category/frontend/',
    title: 'React 19: What\'s New and Upgrade Guide',
    url: '/blog/react-19-whats-new-upgrade-guide',
    description: 'Discover the exciting new features in React 19 and learn how to upgrade your existing applications seamlessly.',
    author: 'Frontend Team',
    authorUrl: '/author/frontend-team/',
    date: 'June 5, 2025',
    image: '/images/cover.jpg'
  },
  {
    id: 4,
    category: 'CSS',
    categoryUrl: '/category/css/',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    url: '/blog/css-grid-vs-flexbox-when-to-use',
    description: 'A comprehensive guide to understanding when to use CSS Grid versus Flexbox for your layout needs.',
    author: 'CSS Team',
    authorUrl: '/author/css-team/',
    date: 'May 28, 2025',
    image: '/images/Workshop-Geniasart-1.png'
  },
  {
    id: 5,
    category: 'Database',
    categoryUrl: '/category/database/',
    title: 'Database Design Principles for Modern Applications',
    url: '/blog/database-design-principles-modern-applications',
    description: 'Master the fundamental principles of database design and learn how to apply them to modern application development.',
    author: 'Database Team',
    authorUrl: '/author/database-team/',
    date: 'May 20, 2025',
    image: '/images/output_tight_mosaic_horizontal.jpeg'
  }
];

const HeroSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="wrapper">
      <div className="hero-slider">
        <div className="hero-slider-content">
          {/* Slider Controls */}
          <ul className="slider-controls">
            {slidesData.map((slide) => (
              <li key={slide.id}>
                <button 
                  className={`slider-control-button ${
                    activeSlide === slide.id 
                      ? 'slider-control-button--active' 
                      : 'slider-control-button--inactive'
                  }`}
                  onClick={() => setActiveSlide(slide.id)}
                  data-index={slide.id}
                  aria-label={`Go to slide ${slide.id}`}
                />
              </li>
            ))}
          </ul>

          {/* Slides */}
          {slidesData.map((slide) => (
            <div 
              key={slide.id}
              className={`slider-item ${activeSlide === slide.id ? '' : 'slider-item--inactive'}`} 
              data-index={slide.id}
            >
              <div className="slide-text">
                <div className="slide-text-content">
                  <Link 
                    href={slide.categoryUrl} 
                    className="slide-category-link"
                  >
                    {/* Empty link as in original */}
                  </Link>
                  
                  <ul className="slide-categories-list">
                    <li className="slide-category-item">
                      <Link 
                        href={slide.categoryUrl}
                        className="slide-category-item-link"
                      >
                        {slide.category}
                      </Link>
                    </li>
                  </ul>
                  
                  <h2 className="slide-title">
                    <Link 
                      href={slide.url}
                      className="slide-title-link"
                    >
                      {slide.title}
                    </Link>
                  </h2>
                  
                  <p className="slide-description">
                    {slide.description}
                  </p>
                  
                  <p className="slide-author">
                    By{' '}
                    <Link 
                      href={slide.authorUrl}
                      className="slide-author-link"
                    >
                      {slide.author}
                    </Link>
                    {' '}
                    <time dateTime="2025-05-26T13:20:10+00:00" className="slide-date">
                      {slide.date}
                    </time>
                  </p>
                </div>
              </div>

              <div className="slide-image-container">
                <Link href={slide.url} className="slide-image-link">
                  <div className="slide-image-wrapper">
                    <Image 
                      src={slide.image} 
                      alt={slide.title} 
                      fill
                      className="slide-image"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={slide.id === 1}
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