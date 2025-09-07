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
    category: 'AI',
    categoryUrl: '/category/ai/',
    title: 'How to create better visuals with less prompting: Workshop by Jerrod',
    url: '/how-to-create-better-visuals-with-less-prompting-workshop-by-jerrod/',
    description: 'We\'re back with our fourth Inspiring Session, this time righ…',
    author: 'Amanda Sanhonorato',
    authorUrl: '/author/amandagordillo/',
    date: 'May 26, 2025',
    image: '/images/Workshop-Jerrod-Lew-Cover.png'
  },
  {
    id: 2,
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    title: 'How to use Auto Ducking in Premiere Pro for clean, professional audio',
    url: '/how-to-use-auto-ducking-in-premiere-pro-for-clean-professional-audio/',
    description: 'Clear and balanced audio is crucial for any video project, w…',
    author: 'Myriam Mira',
    authorUrl: '/author/myriammira/',
    date: 'May 21, 2025',
    image: '/images/Frame-7-1.jpg'
  },
  {
    id: 3,
    category: 'AI',
    categoryUrl: '/category/ai/',
    title: 'Fixing OpenAI\'s color bias with simple RGB scaling',
    url: '/fixing-openais-color-bias-with-simple-rgb-scaling/',
    description: 'A quick fix to counteracting the warm bias in GPT-4o image g…',
    author: 'Freepik',
    authorUrl: '/author/itadm/',
    date: 'May 8, 2025',
    image: '/images/cover.jpg'
  },
  {
    id: 4,
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    title: 'How to make a viral product video with AI by Genia',
    url: '/how-to-make-a-viral-product-video-with-ai-by-genia/',
    description: 'Short-form videos are everywhere now—on Instagram, TikTok, y…',
    author: 'Amanda Sanhonorato',
    authorUrl: '/author/amandagordillo/',
    date: 'May 5, 2025',
    image: '/images/Workshop-Geniasart-1.png'
  },
  {
    id: 5,
    category: 'Product updates',
    categoryUrl: '/category/product-updates/',
    title: 'F Lite: Freepik & Fal.ai unveil an open-source image model trained on licensed data',
    url: '/f-lite-freepik-and-fal-ai-unveil-open-source-image-model-trained-on-licensed-data/',
    description: 'Generative AI is moving at blistering speed, driven by power…',
    author: 'Iván de Prado',
    authorUrl: '/author/ivan/',
    date: 'April 29, 2025',
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