import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  animate?: boolean;
}

export default function Skeleton({ 
  className = '', 
  width = '100%', 
  height = '1rem', 
  rounded = false,
  animate = true 
}: SkeletonProps) {
  return (
    <div 
      className={`skeleton ${rounded ? 'rounded' : ''} ${animate ? 'animate-pulse' : ''} ${className}`}
      style={{ 
        width, 
        height,
        backgroundColor: '#e5e7eb',
        display: 'inline-block',
        borderRadius: rounded ? '0.375rem' : '0',
      }}
    />
  );
}