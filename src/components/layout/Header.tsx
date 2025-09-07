'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header id="header" className="header">
      <div className="header-container">
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
    </header>
  );
};

export default Header;