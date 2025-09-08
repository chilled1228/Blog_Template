'use client';

import React, { useEffect, useState } from 'react';
import CodeBlock from './CodeBlock';

interface BlogContentRendererProps {
  content: string;
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content }) => {
  const [processedContent, setProcessedContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Load Chart.js if charts are detected
    if (content.includes('chart') || content.includes('Chart') || content.includes('canvas')) {
      const loadChartJS = () => {
        if (typeof window !== 'undefined' && !(window as any).Chart) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
          script.async = true;
          script.onload = initializeCharts;
          document.head.appendChild(script);
        } else {
          initializeCharts();
        }
      };

      const initializeCharts = () => {
        // Initialize any charts after a short delay
        setTimeout(() => {
          const chartCanvases = document.querySelectorAll('.chart-container canvas');
          chartCanvases.forEach((canvas) => {
            const ctx = canvas.getContext('2d');
            if (ctx && !(canvas as any).chartInstance) {
              // Basic chart initialization - can be enhanced based on data attributes
              try {
                const chartInstance = new (window as any).Chart(ctx, {
                  type: 'line',
                  data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                      label: 'Sample Data',
                      data: [12, 19, 3, 5, 2, 3],
                      borderColor: '#2563eb',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      tension: 0.4
                    }]
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top'
                      }
                    }
                  }
                });
                (canvas as any).chartInstance = chartInstance;
              } catch (error) {
                console.warn('Failed to initialize chart:', error);
              }
            }
          });
        }, 100);
      };

      loadChartJS();
    }

    // Process interactive elements
    processInteractiveElements();
  }, [content]);

  const processInteractiveElements = () => {
    // Add click handlers to interactive buttons
    const buttons = document.querySelectorAll('.interactive-button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          target.style.transform = '';
        }, 100);
      });
    });

    // Initialize tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const tabContainer = target.closest('.tab-container');
        if (tabContainer) {
          // Remove active class from all buttons and contents
          tabContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
          tabContainer.querySelectorAll('.tab-content').forEach(content => content.setAttribute('hidden', ''));
          
          // Add active class to clicked button
          target.classList.add('active');
          
          // Show corresponding content
          const tabIndex = Array.from(tabContainer.querySelectorAll('.tab-button')).indexOf(target);
          const contents = tabContainer.querySelectorAll('.tab-content');
          if (contents[tabIndex]) {
            contents[tabIndex].removeAttribute('hidden');
          }
        }
      });
    });
  };

  // Parse the HTML content and replace code blocks
  const processContent = (htmlContent: string) => {
    // Split content by pre tags to handle code blocks
    const parts = htmlContent.split(/(<pre[^>]*>[\s\S]*?<\/pre>)/g);
    
    return parts.map((part, index) => {
      // Check if this part is a code block
      const preMatch = part.match(/<pre[^>]*(?:\s+class="([^"]*)")?[^>]*><code[^>]*(?:\s+class="([^"]*)")?[^>]*>([\s\S]*?)<\/code><\/pre>/);
      
      if (preMatch) {
        const [, preClass, codeClass, codeContent] = preMatch;
        
        // Extract language from class names (common patterns: language-js, lang-javascript, etc.)
        let language = 'text';
        const classToCheck = codeClass || preClass || '';
        
        const langMatch = classToCheck.match(/(?:language-|lang-)(\w+)/);
        if (langMatch) {
          language = langMatch[1];
        }
        
        // Clean up the code content
        const cleanContent = codeContent
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .trim();

        return (
          <CodeBlock
            key={index}
            language={language}
            theme="dark"
          >
            {cleanContent}
          </CodeBlock>
        );
      }
      
      // For non-code parts, render as HTML
      if (part.trim()) {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  // If no code blocks found, render normally
  if (!content.includes('<pre>')) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <>{processContent(content)}</>;
};

export default BlogContentRenderer;