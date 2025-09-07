'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header id="header" className="header">
      <Link href="/" className="header-logo">
        <Image 
          src="/images/freepik-logo-blog-svg-1.svg" 
          alt="Freepik Blog" 
          width={150} 
          height={40} 
        />
      </Link>

      {/* Centered Navigation Menu */}
      <div className="header-nav">
        <nav 
          id="nav-main" 
          className="nav nav-main"
          role="navigation"
        >
          <ul>
            <li className="header-menu-item">
              <Link href="/category/inspirational" className="header-menu-item-link">
                Inspirational
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/tips-trends" className="header-menu-item-link">
                Tips and trends
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/outstanding-content" className="header-menu-item-link">
                Outstanding content
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/ai" className="header-menu-item-link">
                AI
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/product-updates" className="header-menu-item-link">
                Product updates
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header-actions">
        <div className="search-button-holder">
          <button 
            className="trigger__button"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <Search className="header-search-icon" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="header-mobile-menu">
          <button 
            className="header-mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="header-menu-icon" />
            ) : (
              <Menu className="header-menu-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="header-mobile-nav active">
          <ul>
            <li className="header-menu-item">
              <Link href="/category/inspirational" className="header-mobile-menu-link">
                Inspirational
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/tips-trends" className="header-mobile-menu-link">
                Tips and trends
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/outstanding-content" className="header-mobile-menu-link">
                Outstanding content
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/ai" className="header-mobile-menu-link">
                AI
              </Link>
            </li>
            <li className="header-menu-item">
              <Link href="/category/product-updates" className="header-mobile-menu-link">
                Product updates
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-container">
            <form role="search" method="get" id="searchform" className="search-form">
              <div className="search-input-container">
                <input 
                  type="search" 
                  id="s" 
                  name="s" 
                  className="search.input"
                  placeholder="Search..."
                  autoFocus
                />
                <button 
                  className="search-close-button"
                  type="button"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <X className="search-close-icon" />
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