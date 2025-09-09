'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const findHeadings = () => {
      // Try multiple selectors to find headings
      let headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6');
      
      // If no headings found in .blog-content, try broader search
      if (headings.length === 0) {
        headings = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
      }
      
      // If still no headings, try even broader
      if (headings.length === 0) {
        headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      }

      const items: TocItem[] = [];
      console.log('Found headings:', headings.length);
      
      headings.forEach((heading, index) => {
        // Skip if heading is in TOC itself
        if (heading.closest('.toc')) return;
        
        const level = parseInt(heading.tagName.charAt(1));
        let id = heading.id;
        
        if (!id) {
          const text = heading.textContent || '';
          id = `heading-${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-${index}`;
          heading.id = id;
        }

        const text = heading.textContent?.trim();
        if (text && !text.includes('Table of Contents')) {
          console.log(`Adding heading: ${text} (${heading.tagName})`);
          items.push({
            id,
            text,
            level
          });
        }
      });

      console.log('TOC items:', items);
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
          if (!heading.closest('.toc')) {
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
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="toc">
      <div className="toc-header">
        <span className="toc-icon">📄</span>
        <span className="toc-title">Table of Contents</span>
      </div>
      <nav className="toc-nav">
        <ul className="toc-list">
          {tocItems.map((item) => (
            <li key={item.id} className={`toc-item toc-level-${item.level}`}>
              <button
                onClick={() => handleClick(item.id)}
                className={`toc-link ${activeId === item.id ? 'toc-active' : ''}`}
                type="button"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;