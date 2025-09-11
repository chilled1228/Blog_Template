'use client'

import { useState, useEffect } from 'react';
import { getCategorySlugByName } from '@/lib/categoryUtils';

export function useCategoryUrl(categoryName: string): string {
  const [categoryUrl, setCategoryUrl] = useState(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);

  useEffect(() => {
    const generateUrl = async () => {
      try {
        const slug = await getCategorySlugByName(categoryName);
        setCategoryUrl(`/category/${slug}`);
      } catch (error) {
        console.error('Error generating category URL:', error);
        // Keep the fallback URL
      }
    };

    if (categoryName) {
      generateUrl();
    }
  }, [categoryName]);

  return categoryUrl;
}