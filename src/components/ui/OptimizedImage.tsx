import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  fetchPriority = priority ? 'high' : 'auto',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  // Handle external URLs that don't work with Next.js Image
  const isExternal = src.startsWith('http') && !src.includes(process.env.NEXT_PUBLIC_SITE_URL || 'behindyourbrain.com');
  
  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        style={style}
        onLoad={onLoad}
        onError={onError}
        decoding="async"
      />
    );
  }

  // Handle cases where dimensions are not provided
  const imageProps: {
    src: string;
    alt: string;
    className: string;
    priority: boolean;
    loading: 'lazy' | 'eager';
    fetchPriority: 'high' | 'low' | 'auto';
    sizes: string;
    quality: number;
    style?: React.CSSProperties;
    onLoad?: () => void;
    onError?: () => void;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    width?: number;
    height?: number;
  } = {
    src,
    alt,
    className,
    priority,
    loading,
    fetchPriority,
    sizes,
    quality,
    style,
    onLoad,
    onError,
  };

  // Add placeholder if specified
  if (placeholder === 'blur' && blurDataURL) {
    imageProps.placeholder = 'blur';
    imageProps.blurDataURL = blurDataURL;
  } else {
    imageProps.placeholder = placeholder;
  }

  // Only add dimensions if they're provided
  if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  }

  return <Image {...imageProps} alt={alt} />;
}

// Responsive image component for different breakpoints
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  breakpoints?: {
    sm?: { width: number; height: number };
    md?: { width: number; height: number };
    lg?: { width: number; height: number };
    xl?: { width: number; height: number };
  };
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
  breakpoints = {
    sm: { width: 400, height: 300 },
    md: { width: 800, height: 600 },
    lg: { width: 1200, height: 800 },
    xl: { width: 1600, height: 1000 },
  },
}: ResponsiveImageProps) {
  return (
    <picture className={className}>
      {breakpoints.xl && (
        <source
          media="(min-width: 1280px)"
          srcSet={`${src}?w=${breakpoints.xl.width}&h=${breakpoints.xl.height}&q=80`}
        />
      )}
      {breakpoints.lg && (
        <source
          media="(min-width: 1024px)"
          srcSet={`${src}?w=${breakpoints.lg.width}&h=${breakpoints.lg.height}&q=80`}
        />
      )}
      {breakpoints.md && (
        <source
          media="(min-width: 768px)"
          srcSet={`${src}?w=${breakpoints.md.width}&h=${breakpoints.md.height}&q=80`}
        />
      )}
      {breakpoints.sm && (
        <source
          media="(min-width: 640px)"
          srcSet={`${src}?w=${breakpoints.sm.width}&h=${breakpoints.sm.height}&q=80`}
        />
      )}
      <OptimizedImage
        src={src}
        alt={alt}
        width={breakpoints.sm?.width || 400}
        height={breakpoints.sm?.height || 300}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    </picture>
  );
}

// Lazy load wrapper component for non-critical images
interface LazyImageProps extends OptimizedImageProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function LazyImage({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  ...props
}: LazyImageProps) {
  return (
    <div className="relative overflow-hidden">
      <OptimizedImage
        {...props}
        loading="lazy"
        fetchPriority="low"
      />
    </div>
  );
}