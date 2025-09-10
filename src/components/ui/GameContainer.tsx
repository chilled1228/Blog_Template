'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

interface GameContainerProps {
  htmlContent: string;
  className?: string;
}

interface GameScript {
  content: string;
  type: 'inline' | 'external';
  src?: string;
  id: string;
}

interface GameFramework {
  name: string;
  detection: RegExp[];
  loader?: () => Promise<void>;
}

const GameContainer: React.FC<GameContainerProps> = ({ htmlContent, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  // Common game frameworks detection
  const gameFrameworks: GameFramework[] = [
    {
      name: 'Phaser',
      detection: [/phaser/i, /new Phaser\./i]
    },
    {
      name: 'Three.js',
      detection: [/three\.js/i, /THREE\./i, /new THREE\./i]
    },
    {
      name: 'p5.js',
      detection: [/p5\./i, /new p5/i, /function setup\(\)/i]
    },
    {
      name: 'Matter.js',
      detection: [/Matter\./i, /Matter\.Engine/i]
    },
    {
      name: 'PixiJS',
      detection: [/PIXI\./i, /new PIXI\./i]
    },
    {
      name: 'Babylon.js',
      detection: [/BABYLON\./i, /new BABYLON\./i]
    },
    {
      name: 'PlayCanvas',
      detection: [/pc\./i, /new pc\./i]
    },
    {
      name: 'Construct',
      detection: [/c2runtime/i, /cr_createRuntime/i]
    },
    {
      name: 'Unity WebGL',
      detection: [/unityInstance/i, /UnityLoader/i, /\.unity3d/i]
    },
    {
      name: 'Cocos2d',
      detection: [/cc\./i, /new cc\./i]
    }
  ];

  // Load external libraries dynamically
  const loadLibrary = useCallback(async (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load library: ${src}`));
      document.head.appendChild(script);
    });
  }, []);

  // Detect and load required frameworks
  const detectAndLoadFrameworks = useCallback(async (content: string): Promise<void> => {
    const loadedFrameworks = new Set<string>();

    for (const framework of gameFrameworks) {
      const isDetected = framework.detection.some(regex => regex.test(content));
      if (isDetected && !loadedFrameworks.has(framework.name)) {
        console.log(`🎮 Detected ${framework.name} game framework`);
        
        try {
          if (framework.loader) {
            await framework.loader();
          }
          loadedFrameworks.add(framework.name);
        } catch (err) {
          console.warn(`Failed to load ${framework.name}:`, err);
        }
      }
    }

    // Load common game libraries based on content
    if (content.includes('canvas') && content.includes('getContext')) {
      try {
        // Ensure canvas support is available
        const testCanvas = document.createElement('canvas');
        const ctx = testCanvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas not supported');
        }
      } catch (err) {
        console.warn('Canvas support check failed:', err);
      }
    }

    // Load jQuery if needed (many older games use it)
    if (content.includes('$') || content.includes('jQuery')) {
      try {
        await loadLibrary('https://code.jquery.com/jquery-3.6.0.min.js');
        console.log('📦 jQuery loaded for game compatibility');
      } catch (err) {
        console.warn('Failed to load jQuery:', err);
      }
    }
  }, [loadLibrary]);

  // Extract and process scripts
  const extractScripts = useCallback((html: string): GameScript[] => {
    const scripts: GameScript[] = [];
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    const externalScriptRegex = /<script[^>]*src="([^"]*)"[^>]*>/gi;
    
    let match;
    
    // Extract external scripts
    while ((match = externalScriptRegex.exec(html)) !== null) {
      scripts.push({
        content: '',
        type: 'external',
        src: match[1],
        id: `external_${scripts.length}`
      });
    }
    
    // Extract inline scripts
    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptContent = match[1];
      if (scriptContent.trim()) {
        scripts.push({
          content: scriptContent,
          type: 'inline',
          id: `inline_${scripts.length}`
        });
      }
    }
    
    return scripts;
  }, []);

  // Clean HTML content (remove scripts, they'll be handled separately)
  const cleanHtmlContent = useCallback((html: string): string => {
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<script[^>]*src="[^"]*"[^>]*>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }, []);

  // Execute scripts safely
  const executeScript = useCallback(async (script: GameScript): Promise<void> => {
    try {
      if (script.type === 'external' && script.src) {
        await loadLibrary(script.src);
        return;
      }

      if (script.type === 'inline') {
        let scriptContent = script.content;
        
        // Decode HTML entities
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = scriptContent;
        scriptContent = tempDiv.textContent || tempDiv.innerText || scriptContent;
        
        // Clean up common HTML encoding issues
        scriptContent = scriptContent
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&#39;/g, "'")
          .trim();

        if (!scriptContent) return;

        // Validate JavaScript syntax
        try {
          new Function(scriptContent);
        } catch (syntaxError) {
          console.warn('❌ Invalid JavaScript syntax:', syntaxError);
          return;
        }

        // Execute in global scope for games
        try {
          // Use window.eval for games that need global scope
          window.eval(scriptContent);
          console.log('✅ Game script executed successfully');
        } catch (runtimeError) {
          console.warn('❌ Runtime error executing script:', runtimeError);
          
          // Try alternative execution method
          try {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptContent;
            document.body.appendChild(scriptElement);
            document.body.removeChild(scriptElement);
            console.log('✅ Game script executed via DOM injection');
          } catch (domError) {
            console.warn('❌ DOM injection also failed:', domError);
          }
        }
      }
    } catch (error) {
      console.warn('❌ Error processing script:', error);
      setError(`Script execution error: ${error}`);
    }
  }, [loadLibrary]);

  // Initialize game
  const initializeGame = useCallback(async () => {
    if (processedRef.current || !containerRef.current) return;
    
    processedRef.current = true;
    setIsLoaded(true);
    
    try {
      const scripts = extractScripts(htmlContent);
      const cleanHtml = cleanHtmlContent(htmlContent);
      
      // First, load the cleaned HTML
      containerRef.current.innerHTML = cleanHtml;
      
      // Detect and load frameworks
      await detectAndLoadFrameworks(htmlContent);
      
      // Execute scripts in order
      for (const script of scripts) {
        await executeScript(script);
      }
      
      console.log('🎮 Game initialized successfully');
      
    } catch (err) {
      console.error('❌ Failed to initialize game:', err);
      setError(`Game initialization failed: ${err}`);
    }
  }, [htmlContent, extractScripts, cleanHtmlContent, detectAndLoadFrameworks, executeScript]);

  // Initialize when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !processedRef.current) {
      // Add a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeGame();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [initializeGame]);

  // Handle mobile-specific setup
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      // Add viewport meta tag for mobile games if not present
      if (!document.querySelector('meta[name="viewport"][content*="user-scalable=no"]')) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          // Don't modify existing viewport, just ensure mobile games work
          console.log('📱 Mobile game container initialized');
        }
      }
      
      // Add touch event optimization
      const addTouchOptimization = () => {
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: true });
      };
      
      addTouchOptimization();
    }
  }, [isLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={`game-container ${className}`}>
      {!isLoaded && (
        <div className="game-loading">
          <div className="game-loading-spinner">🎮</div>
          <p>Loading game...</p>
        </div>
      )}
      
      {error && (
        <div className="game-error">
          <h3>⚠️ Game Error</h3>
          <p>{error}</p>
          <p>Please check the game code and try again.</p>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="game-content"
        style={{ 
          display: isLoaded ? 'block' : 'none',
          minHeight: '150px'
        }}
      />
      
      <style jsx>{`
        /* Mobile-first game container styles */
        .game-container {
          position: relative;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
          overflow: hidden;
          margin: 1rem 0;
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        .game-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 150px;
          color: #6b7280;
          padding: 1rem;
        }
        
        .game-loading-spinner {
          font-size: 1.5rem;
          animation: spin 1s linear infinite;
          margin-bottom: 0.5rem;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .game-error {
          padding: 0.75rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #dc2626;
          margin: 0.5rem;
        }
        
        .game-error h3 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
        }
        
        .game-error p {
          margin: 0.25rem 0;
          font-size: 0.75rem;
        }
        
        .game-content {
          width: 100%;
          min-height: 150px;
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        /* Game-specific styles - mobile first */
        .game-content canvas {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          user-drag: none;
        }
        
        .game-content iframe {
          border: none;
          width: 100%;
          min-height: 200px;
        }
        
        /* Ensure game elements are properly contained and not draggable */
        .game-content * {
          max-width: 100%;
          box-sizing: border-box;
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          user-drag: none;
        }
        
        /* Mobile-friendly game buttons */
        .game-content button,
        .game-content input[type="button"],
        .game-content input[type="submit"] {
          min-height: 44px;
          min-width: 44px;
          font-size: 16px;
          padding: 12px 16px;
          margin: 4px;
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        /* Adjust game containers for mobile */
        .game-content > div {
          max-width: 100%;
          overflow-x: auto;
          touch-action: manipulation;
        }
        
        /* Tablet styles */
        @media (min-width: 768px) {
          .game-container {
            margin: 1.5rem 0;
            border-radius: 12px;
          }
          
          .game-loading {
            min-height: 200px;
          }
          
          .game-loading-spinner {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          
          .game-content {
            min-height: 250px;
          }
          
          .game-content canvas {
            max-height: 50vh;
          }
          
          .game-content iframe {
            min-height: 300px;
          }
        }
        
        /* Desktop styles */
        @media (min-width: 1024px) {
          .game-container {
            margin: 2rem 0;
            border: 2px solid #e5e7eb;
          }
          
          .game-content {
            min-height: 300px;
          }
          
          .game-content canvas {
            max-height: 60vh;
          }
          
          .game-content iframe {
            min-height: 400px;
          }
          
          .game-error {
            padding: 1rem;
            margin: 1rem;
          }
          
          .game-error h3 {
            font-size: 1rem;
          }
          
          .game-error p {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GameContainer;