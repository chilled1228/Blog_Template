'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const MobileTableOfContents: React.FC = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const findHeadings = () => {
      let headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6');
      
      if (headings.length === 0) {
        headings = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
      }
      
      if (headings.length === 0) {
        headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      }

      const items: TocItem[] = [];
      
      headings.forEach((heading, index) => {
        if (heading.closest('.toc') || heading.closest('.mobile-toc')) return;
        
        const level = parseInt(heading.tagName.charAt(1));
        let id = heading.id;
        
        if (!id) {
          const text = heading.textContent || '';
          id = `heading-${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-${index}`;
          heading.id = id;
        }

        const text = heading.textContent?.trim();
        if (text && !text.includes('Table of Contents')) {
          items.push({
            id,
            text,
            level
          });
        }
      });

      setTocItems(items);

      if (items.length > 0) {
        const observerOptions = {
          rootMargin: '-10% 0% -80% 0%',
          threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        }, observerOptions);

        headings.forEach((heading) => {
          if (!heading.closest('.toc') && !heading.closest('.mobile-toc')) {
            observer.observe(heading);
          }
        });

        return () => {
          observer.disconnect();
        };
      }
    };

    // Try immediately and with shorter delays
    findHeadings();
    const timers = [
      setTimeout(findHeadings, 100),
      setTimeout(findHeadings, 300),
      setTimeout(findHeadings, 500),
      setTimeout(findHeadings, 1000)
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Handle scroll to transform inline TOC to floating button
  useEffect(() => {
    const handleScroll = () => {
      const inlineToc = document.getElementById('inline-mobile-toc');
      if (inlineToc) {
        const rect = inlineToc.getBoundingClientRect();
        const isScrolledPast = rect.bottom < -50; // Add some buffer
        const isTransitioning = rect.bottom < 100 && rect.bottom > -50; // Transition zone
        
        // Add transitioning class when TOC is being scrolled past
        if (isTransitioning && !isScrolledPast) {
          inlineToc.classList.add('transitioning');
        } else {
          inlineToc.classList.remove('transitioning');
        }
        
        setIsFloating(isScrolledPast);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Populate the inline TOC in the DOM
  useEffect(() => {
    const inlineTocNav = document.querySelector('#inline-mobile-toc .mobile-toc-inline-header');
    const inlineTocContainer = document.getElementById('inline-mobile-toc');
    
    if (inlineTocContainer && tocItems.length > 0) {
      // Remove existing nav if present
      const existingNav = inlineTocContainer.querySelector('.mobile-toc-inline-nav');
      if (existingNav) {
        existingNav.remove();
      }
      
      // Create and populate the nav
      const nav = document.createElement('nav');
      nav.className = 'mobile-toc-inline-nav';
      
      const ul = document.createElement('ul');
      ul.className = 'mobile-toc-list';
      
      tocItems.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'mobile-toc-item';
        
        const button = document.createElement('button');
        button.className = `mobile-toc-link ${activeId === item.id ? 'mobile-toc-active' : ''}`;
        button.textContent = item.text;
        button.type = 'button';
        button.onclick = () => handleClick(item.id);
        
        li.appendChild(button);
        ul.appendChild(li);
      });
      
      nav.appendChild(ul);
      inlineTocContainer.appendChild(nav);
    }
  }, [tocItems, activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false); // Close drawer after clicking
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleDrawer}
        className={`mobile-toc-toggle ${isFloating ? 'mobile-toc-toggle-show' : 'mobile-toc-toggle-hide'}`}
        aria-label="Toggle Table of Contents"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="mobile-toc-text">Table of Contents</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="mobile-toc-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`mobile-toc-drawer ${isOpen ? 'mobile-toc-drawer-open' : ''}`}>
        <div className="mobile-toc-header">
          <div className="flex items-center gap-2">
            <span className="mobile-toc-icon">📄</span>
            <span className="mobile-toc-title">Table of Contents</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="mobile-toc-close"
            aria-label="Close Table of Contents"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <nav className="mobile-toc-nav">
          <ul className="mobile-toc-list">
            {tocItems.map((item) => (
              <li key={item.id} className="mobile-toc-item">
                <button
                  onClick={() => handleClick(item.id)}
                  className={`mobile-toc-link ${activeId === item.id ? 'mobile-toc-active' : ''}`}
                  type="button"
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileTableOfContents;