import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  animate?: boolean;
}

export default function Skeleton({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = false,
  animate = true 
}: SkeletonProps) {
  return (
    <div 
      className={cn(
        'inline-block bg-gray-200',
        width,
        height,
        rounded ? 'rounded-md' : '',
        animate ? 'animate-pulse' : '',
        className
      )}
    />
  );
}