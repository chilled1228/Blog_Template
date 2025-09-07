'use client';

import React from 'react';
import CodeBlock from './CodeBlock';

interface BlogContentRendererProps {
  content: string;
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content }) => {
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