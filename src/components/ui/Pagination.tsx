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
    <div className="pagination">
      <div className="pagination-button-container">
        {prevPageUrl && (
          <Link 
            href={prevPageUrl} 
            className="pagination-prev-button"
          >
            <ChevronRight className="pagination-button-icon pagination-button-icon--prev" />
            <span className="pagination-button-text">Previous page</span>
          </Link>
        )}
        
        {nextPageUrl && (
          <Link 
            href={nextPageUrl} 
            className="pagination-next-button"
          >
            <span className="pagination-button-text">Next page</span>
            <ChevronRight className="pagination-button-icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;