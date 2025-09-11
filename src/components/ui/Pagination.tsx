import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ChevronRight } from 'lucide-react';
import { typography, textColors } from '@/lib/typography';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  nextPageUrl?: string;
  prevPageUrl?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  nextPageUrl = '/page/2/',
  prevPageUrl 
}) => {
  return (
    <div className="mt-8 sm:mt-12 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        {prevPageUrl && (
          <Link 
            href={prevPageUrl as Route} 
            className={`${typography.button} flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg ${textColors.body} hover:bg-gray-50 hover:border-gray-400 transition-all duration-200`}
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Previous page</span>
          </Link>
        )}
        
        {nextPageUrl && (
          <Link 
            href={nextPageUrl as Route} 
            className={`${typography.button} flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg ${textColors.body} hover:bg-gray-50 hover:border-gray-400 transition-all duration-200`}
          >
            <span>Next page</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;