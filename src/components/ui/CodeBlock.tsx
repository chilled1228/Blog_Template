'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  theme?: 'dark' | 'light';
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'javascript', 
  filename,
  theme = 'dark' 
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const codeStyle = theme === 'dark' ? oneDark : oneLight;

  return (
    <div className="code-block-container">
      {filename && (
        <div className="code-block-header">
          <span className="code-block-filename">{filename}</span>
          <button
            onClick={copyToClipboard}
            className="code-block-copy-btn"
            aria-label="Copy code"
          >
            {copied ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      )}
      <div className="code-block-wrapper">
        {!filename && (
          <button
            onClick={copyToClipboard}
            className="code-block-copy-btn-floating"
            aria-label="Copy code"
          >
            {copied ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={codeStyle}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '14px',
            lineHeight: '1.5',
            borderRadius: filename ? '0 0 12px 12px' : '12px',
            background: theme === 'dark' ? '#1e293b' : '#f8fafc',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: theme === 'dark' ? '#64748b' : '#94a3b8',
            borderRight: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            marginRight: '1em',
          }}
          wrapLongLines={false}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;