'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { href: '/category/inspirational', label: 'Inspirational' },
    { href: '/category/tips-trends', label: 'Tips and trends' },
    { href: '/category/outstanding-content', label: 'Outstanding content' },
    { href: '/category/ai', label: 'AI' },
    { href: '/category/product-updates', label: 'Product updates' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{ background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 100%)' }}>
      <div className="flex justify-center items-center w-full max-w-7xl mx-auto relative h-14 lg:h-16 px-4">
        {/* Mobile menu button */}
        <div className="absolute left-4 lg:hidden">
          <button 
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset transition-colors duration-200"
            style={{ color: 'var(--text-secondary)', focusRingColor: 'var(--verdigris)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--black-olive)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Centered Navigation Menu - Desktop */}
        <nav 
          id="nav-main" 
          className="hidden lg:flex items-center justify-center flex-grow mx-4"
          role="navigation"
        >
          <ul className="flex items-center justify-center gap-8 flex-wrap">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--verdigris)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 right-0 shadow-lg lg:hidden" style={{ background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 100%)', borderTop: '1px solid #3d8a8e' }}>
          <div className="px-4 py-2">
            <ul className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="block py-3 px-2 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--verdigris)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;