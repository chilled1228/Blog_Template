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
      <div className="hero-slider bg-white rounded-2xl overflow-hidden">
        <div className="content relative">
          {/* Slider Controls */}
          <ul className="slider--controls absolute bottom-6 left-6 z-10 flex gap-3">
            {slidesData.map((slide) => (
              <li key={slide.id}>
                <button 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSlide === slide.id 
                      ? 'bg-blue-600' 
                      : 'bg-gray-500 hover:bg-gray-600'
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
              className={`slider__item ${activeSlide === slide.id ? 'is-active' : 'hidden'} grid grid-cols-1 lg:grid-cols-2 min-h-[500px]`} 
              data-index={slide.id}
            >
              <div className="slide--text flex items-center p-6 lg:p-12 order-2 lg:order-1">
                <div className="slide--text-content max-w-lg">
                  <Link 
                    href={slide.categoryUrl} 
                    className="text__state--blue uppercase text-xs font-semibold tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {/* Empty link as in original */}
                  </Link>
                  
                  <ul className="slide--categories mb-4">
                    <li>
                      <Link 
                        href={slide.categoryUrl}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wide"
                      >
                        {slide.category}
                      </Link>
                    </li>
                  </ul>
                  
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 leading-tight">
                    <Link 
                      href={slide.url}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {slide.title}
                    </Link>
                  </h2>
                  
                  <p className="slide-description text-gray-600 mb-4 line-clamp-2 hidden lg:block">
                    {slide.description}
                  </p>
                  
                  <p className="slide-author text-sm text-gray-500">
                    By{' '}
                    <Link 
                      href={slide.authorUrl}
                      className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {slide.author}
                    </Link>
                    {' '}
                    <time dateTime="2025-05-26T13:20:10+00:00" className="text-gray-500">
                      {slide.date}
                    </time>
                  </p>
                </div>
              </div>

              <div className="slide--img relative overflow-hidden order-1 lg:order-2 p-2 lg:p-3">
                <Link href={slide.url} className="block h-full">
                  <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
                    <Image 
                      src={slide.image} 
                      alt={slide.title} 
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
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