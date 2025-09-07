import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  nextPageUrl?: string;
  prevPageUrl?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage = 1, 
  totalPages = 10,
  nextPageUrl = '/page/2/',
  prevPageUrl 
}) => {
  return (
    <div className="pagination mt-12">
      <div className="pagination__button flex justify-center">
        {prevPageUrl && (
          <Link 
            href={prevPageUrl} 
            className="button button--lg button--flat button--icon mr-4 flex items-center gap-2 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Previous page</span>
          </Link>
        )}
        
        {nextPageUrl && (
          <Link 
            href={nextPageUrl} 
            className="button button--lg button--flat button--icon flex items-center gap-2 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
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