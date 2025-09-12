'use client'

import React, { useState, useEffect, useRef } from 'react';
import DynamicFooter from './DynamicFooter';
import { DynamicNavBar } from '@/components/ui/dynamic-navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const navElement = navContainerRef.current;
    if (!navElement) return;

    const initialOffsetTop = navElement.offsetTop;

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > initialOffsetTop);
    };

    const resizeObserver = new ResizeObserver(() => {
      setNavHeight(navElement.offsetHeight);
    });

    resizeObserver.observe(navElement);
    window.addEventListener('scroll', handleScroll);

    // Set initial height
    setNavHeight(navElement.offsetHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="freepik home blog wp-theme-freepik-blog hfeed min-h-screen flex flex-col font-sans">
      <div ref={navContainerRef} style={{ height: isSticky ? navHeight : 'auto' }}>
        <div
          className={`w-full transition-all duration-500 ease-in-out ${
            isSticky
              ? 'fixed top-0 left-0 right-0 z-50 bg-[#fef9f8]/80 backdrop-blur-lg shadow-md'
              : 'relative py-10'
          }`}
        >
          <DynamicNavBar isSticky={isSticky} />
        </div>
      </div>
      <main id="main" className="flex-grow relative z-0">
        <div id="content" role="main" className="main-container">
          {children}
        </div>
      </main>
      <DynamicFooter />
    </div>
  );
};

export default Layout;