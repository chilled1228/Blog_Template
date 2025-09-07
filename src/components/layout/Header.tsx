'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header id="header" className="fixed top-0 left-0 right-0 z-50">
      {/* Centered Navigation Menu */}
      <div className="flex justify-center items-center h-16">
        <nav 
          id="nav-main" 
          className="nav nav-main"
          role="navigation"
        >
          <ul className="flex items-center justify-center space-x-8">
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/inspirational" className="text-gray-700 hover:text-blue-600 no-underline font-medium">
                Inspirational
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/tips-trends" className="text-gray-700 hover:text-blue-600 no-underline font-medium">
                Tips and trends
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/outstanding-content" className="text-gray-700 hover:text-blue-600 no-underline font-medium">
                Outstanding content
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/ai" className="text-gray-700 hover:text-blue-600 no-underline font-medium">
                AI
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/product-updates" className="text-gray-700 hover:text-blue-600 no-underline font-medium">
                Product updates
              </Link>
            </li>
            
            <li className="search-button-holder">
              <button 
                className="button button--icon button--icon--only trigger__button"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <div className="absolute right-4 md:hidden">
          <button 
            className="button button--md button--icon button--icon--only trigger__button"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white py-4 border-t border-gray-200">
          <ul className="flex flex-col space-y-4 px-4">
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/inspirational" className="text-gray-700 hover:text-blue-600 no-underline font-medium block py-2">
                Inspirational
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/tips-trends" className="text-gray-700 hover:text-blue-600 no-underline font-medium block py-2">
                Tips and trends
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/outstanding-content" className="text-gray-700 hover:text-blue-600 no-underline font-medium block py-2">
                Outstanding content
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/ai" className="text-gray-700 hover:text-blue-600 no-underline font-medium block py-2">
                AI
              </Link>
            </li>
            <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
              <Link href="/category/product-updates" className="text-gray-700 hover:text-blue-600 no-underline font-medium block py-2">
                Product updates
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div id="search" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start pt-20 justify-center trigger search--holder">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
            <form role="search" method="get" id="searchform" className="w-full">
              <div className="flex items-center">
                <input 
                  type="search" 
                  id="s" 
                  name="s" 
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                  autoFocus
                />
                <button 
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded-r-lg trigger__close"
                  type="button"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;