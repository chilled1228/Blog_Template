'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import CodeBlock from './CodeBlock';

// Chart.js type definitions
interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: string;
    };
  };
  animation?: {
    duration?: number;
    easing?: string;
  };
}

interface ChartConfig {
  type: string;
  data: ChartData;
  options?: ChartOptions;
}

interface ChartConstructor {
  new (ctx: CanvasRenderingContext2D, config: ChartConfig): ChartInstance;
}

interface ChartInstance {
  destroy?: () => void;
}

interface WindowWithChart extends Window {
  Chart?: ChartConstructor;
}

interface BlogContentRendererProps {
  content: string;
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content }) => {
  const hasInitialized = useRef(false);
  const chartJsLoaded = useRef(false);

  const createChart = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Check for data attributes first
      const chartType = canvas.dataset.chartType || 'line';
      const chartData = canvas.dataset.chartData ? 
        JSON.parse(canvas.dataset.chartData) : {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4
          }]
        };

      const windowWithChart = window as WindowWithChart;
      if (!windowWithChart.Chart) return;

      const chartInstance = new windowWithChart.Chart(ctx, {
        type: chartType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          animation: {
            duration: 750,
            easing: 'easeInOutQuart'
          }
        }
      });

      (canvas as HTMLCanvasElement & { chartInstance?: ChartInstance }).chartInstance = chartInstance;
    } catch (error) {
      console.warn('Failed to initialize chart:', error);
    }
  }, []);

  // Optimized chart initialization with intersection observer
  const initializeCharts = useCallback(() => {
    const windowWithChart = window as WindowWithChart;
    if (typeof window === 'undefined' || !windowWithChart.Chart) return;

    // Use Intersection Observer for lazy loading charts
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const canvas = entry.target as HTMLCanvasElement;
          if (!canvas.dataset.chartInitialized) {
            canvas.dataset.chartInitialized = 'true';
            createChart(canvas);
            observer.unobserve(canvas);
          }
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    const chartCanvases = document.querySelectorAll('.chart-container canvas');
    chartCanvases.forEach((canvas) => {
      if (!(canvas as HTMLCanvasElement).dataset.chartInitialized) {
        observer.observe(canvas);
      }
    });

    return () => observer.disconnect();
  }, [createChart]);

  // Optimized chart loading with lazy loading
  const loadChartJS = useCallback(() => {
    if (typeof window === 'undefined' || chartJsLoaded.current) return;
    
    const loadChart = () => {
      const windowWithChart = window as WindowWithChart;
      if (!windowWithChart.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        script.onload = () => {
          chartJsLoaded.current = true;
          initializeCharts();
        };
        script.onerror = () => {
          console.warn('Failed to load Chart.js');
        };
        document.head.appendChild(script);
      } else {
        chartJsLoaded.current = true;
        initializeCharts();
      }
    };

    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      (window as typeof window & { requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number }).requestIdleCallback(loadChart, { timeout: 2000 });
    } else {
      setTimeout(loadChart, 100);
    }
  }, [initializeCharts]);

  // Optimized interactive element initialization with event delegation
  const processInteractiveElements = useCallback(() => {
    // Use event delegation for better performance
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('interactive-button')) {
        e.preventDefault();
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          target.style.transform = '';
        }, 100);
      }
    };

    const handleTabClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tab-button')) {
        e.preventDefault();
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
      }
    };

    // Add event listeners to the document with event delegation
    document.addEventListener('click', handleButtonClick);
    document.addEventListener('click', handleTabClick);

    return () => {
      document.removeEventListener('click', handleButtonClick);
      document.removeEventListener('click', handleTabClick);
    };
  }, []);

  // Optimized effect with proper cleanup
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Only load Chart.js if actually needed
    const hasCharts = content.includes('chart-container') || 
                      content.includes('canvas') || 
                      content.includes('Chart.js');
    
    const hasInteractiveElements = content.includes('interactive-button') || 
                                content.includes('tab-button');

    if (hasCharts) {
      loadChartJS();
    }

    if (hasInteractiveElements) {
      const cleanup = processInteractiveElements();
      return cleanup;
    }
  }, [content, loadChartJS, processInteractiveElements]);

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