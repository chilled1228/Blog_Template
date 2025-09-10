'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import CodeBlock from './CodeBlock';
import GameContainer from './GameContainer';

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

  // Process and execute inline scripts for games
  const processInlineScripts = useCallback(() => {
    const scripts = document.querySelectorAll('script:not([data-processed])');
    scripts.forEach((script) => {
      const scriptElement = script as HTMLScriptElement;
      if (scriptElement.textContent && !scriptElement.src) {
        try {
          // Mark as processed to avoid re-execution
          script.setAttribute('data-processed', 'true');
          
          // Clean and decode HTML entities in script content
          let scriptContent = scriptElement.textContent?.trim() || '';
          
          // Skip empty scripts
          if (!scriptContent) return;
          
          // Decode HTML entities properly
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = scriptContent;
          scriptContent = tempDiv.textContent || tempDiv.innerText || '';
          
          // Additional HTML entity cleanup
          scriptContent = scriptContent
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&#39;/g, "'")
            .trim();
          
          // Skip if still empty after cleanup
          if (!scriptContent) return;
          
          // Log the script content for debugging
          console.log('Processing script content:', scriptContent.substring(0, 100) + (scriptContent.length > 100 ? '...' : ''));
          
          // Try to validate basic JavaScript syntax
          try {
            new Function(scriptContent);
          } catch (syntaxError) {
            console.warn('Invalid JavaScript syntax in inline script:', syntaxError);
            console.warn('Script content causing error:', scriptContent);
            return;
          }
          
          // Execute using Function constructor for better error handling
          try {
            // Check if script contains functions that need to be globally accessible
            const globalFunctionPattern = /function\s+(\w+)\s*\(/g;
            const globalFunctions = [];
            let match;
            
            while ((match = globalFunctionPattern.exec(scriptContent)) !== null) {
              globalFunctions.push(match[1]);
            }
            
            // Also check for onclick handlers and other game-related functions
            const hasGameFunctions = scriptContent.includes('onclick=') || 
                                   scriptContent.includes('resetGame') || 
                                   scriptContent.includes('selectNumber') ||
                                   scriptContent.includes('checkAnswer') ||
                                   scriptContent.includes('nextWord') ||
                                   scriptContent.includes('updateTimer') ||
                                   scriptContent.includes('generateStroopWord');
            
            // If we found global functions or game functions, execute in global scope
            if (globalFunctions.length > 0 || hasGameFunctions) {
              // Execute in global scope using eval for games that need global function access
              window.eval(scriptContent);
            } else {
              // Use Function constructor for isolated execution
              const executeScript = new Function(scriptContent);
              executeScript();
            }
          } catch (runtimeError) {
            console.warn('Runtime error in inline script:', runtimeError);
            console.warn('Script content that caused runtime error:', scriptContent);
          }
          
        } catch (error) {
          console.warn('Error processing inline script:', error);
        }
      }
    });
  }, []);

  // Optimized interactive element initialization with event delegation
  const processInteractiveElements = useCallback(() => {
    // Process any inline scripts first
    processInlineScripts();
    
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
  }, [processInlineScripts]);

  // Component-level game detection
  const hasCharts = content.includes('chart-container') || 
                    content.includes('canvas') || 
                    content.includes('Chart.js');
  
  const hasInteractiveElements = content.includes('interactive-button') || 
                              content.includes('tab-button');
  
  const hasInlineScripts = content.includes('<script>') || 
                         content.includes('function ') ||
                         content.includes('onclick=') ||
                         content.includes('addEventListener') ||
                         content.includes('selectNumber') ||
                         content.includes('resetTable') ||
                         content.includes('checkAnswer') ||
                         content.includes('nextWord');
                          
  // Detect if content contains games - component level
  const hasGames = content.includes('<script>') && 
                  (content.includes('onclick=') || 
                   content.includes('canvas') || 
                   content.includes('game') || 
                   content.includes('selectNumber') ||
                   content.includes('checkAnswer') ||
                   content.includes('resetTable') ||
                   content.includes('Phaser') ||
                   content.includes('THREE.') ||
                   content.includes('p5.') ||
                   content.includes('Matter.'));

  // Optimized effect with proper cleanup - only run on client
  useEffect(() => {
    if (typeof window === 'undefined' || hasInitialized.current) return;
    hasInitialized.current = true;

    if (hasCharts) {
      loadChartJS();
    }

    if (hasInteractiveElements || hasInlineScripts) {
      // Delay execution to ensure DOM is ready
      const timer = setTimeout(() => {
        const cleanup = processInteractiveElements();
        return cleanup;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [content, loadChartJS, processInteractiveElements, hasCharts, hasInteractiveElements, hasInlineScripts, hasGames]);

  // Check if content contains games
  const isGameContent = (htmlContent: string): boolean => {
    return htmlContent.includes('<script>') && 
           (htmlContent.includes('onclick=') || 
            htmlContent.includes('canvas') || 
            htmlContent.includes('game') || 
            htmlContent.includes('selectNumber') ||
            htmlContent.includes('checkAnswer') ||
            htmlContent.includes('resetTable') ||
            htmlContent.includes('Phaser') ||
            htmlContent.includes('THREE.') ||
            htmlContent.includes('p5.') ||
            htmlContent.includes('Matter.'));
  };

  // Parse the HTML content and replace code blocks
  const processContent = (htmlContent: string) => {
    // Split content by pre tags to handle code blocks (H1 cleaning is done before this)
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
      
      // For non-code parts, check if it's game content
      if (part.trim()) {
        if (isGameContent(part)) {
          return (
            <GameContainer
              key={index}
              htmlContent={part}
              className="my-4"
            />
          );
        }
        
        // Regular HTML content
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

  // Effect to handle scripts after content is rendered - client only (skip for game content)
  useEffect(() => {
    if (typeof window === 'undefined' || hasGames) return;
    
    const timer = setTimeout(() => {
      processInlineScripts();
    }, 150);
    
    return () => clearTimeout(timer);
  }, [content, processInlineScripts, hasGames]);

  // Process content once and memoize to prevent hydration issues
  const processedContent = React.useMemo(() => {
    // Convert H1 to H2 to maintain proper heading hierarchy (silent conversion)
    const cleanedContent = content.replace(/<h1([^>]*)>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>');
    
    // If no code blocks found, return cleaned content
    if (!cleanedContent.includes('<pre>')) {
      return <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />;
    }

    return <>{processContent(cleanedContent)}</>;
  }, [content, processContent]);

  // Show H1 warnings only on client side to avoid hydration issues
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
    if (h1Count > 0) {
      console.warn(`⚠️ H1 Conflict Detected: Found ${h1Count} H1 tag(s) in content. Converting to H2 for proper SEO structure.`);
      console.warn('💡 Best Practice: Use only <h2>, <h3>, etc. in blog content. The page title is already an H1.');
    }
  }, [content]);

  return processedContent;
};

export default BlogContentRenderer;